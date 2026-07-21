from flask import Blueprint, request, jsonify

from extensions import db

from models.blood_request import BloodRequest
from models.user import User
from models.donor_response import DonorResponse

from utils.email_utils import (
    send_email,
    build_template
)

from utils.auth import (
    patient_required,
    admin_required
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)



blood_request_bp = Blueprint(
    "blood_request",
    __name__
)





# ==================================================
# CREATE BLOOD REQUEST (PATIENT)
# ==================================================

@blood_request_bp.route("/", methods=["POST"])
@patient_required
def create_request():


    data = request.get_json()



    if not data:

        return jsonify({

            "message":
            "Request body is required"

        }),400



    patient_id = get_jwt_identity()



    patient = User.query.get(patient_id)



    blood_request = BloodRequest(

        patient_id=patient_id,

        patient_name=data["patient_name"],

        blood_group=data["blood_group"],

        units_needed=data["units_needed"],

        hospital=data["hospital"],

        location=data["location"]

    )



    db.session.add(blood_request)

    db.session.commit()



    donors = User.query.filter_by(

        role="donor",

        blood_group=data["blood_group"],

        availability="Available"

    ).all()



    emails_sent = 0



    for donor in donors:

        try:

            send_email(

                donor.email,

                "🩸 Urgent Blood Request - LifeLink",

                f"""
Hello {donor.full_name},

A patient urgently needs blood.

Patient:
{blood_request.patient_name}

Blood Group:
{blood_request.blood_group}

Hospital:
{blood_request.hospital}

Location:
{blood_request.location}

Please login to LifeLink if you can donate.

LifeLink Blood Donation System
"""

            )


            emails_sent += 1



        except Exception as e:

            print(
                "Email error:",
                e
            )



    return jsonify({

        "message":
        "Blood request created successfully",

        "matching_donors":
        len(donors),

        "emails_sent":
        emails_sent

    }),201







# ==================================================
# GET ALL REQUESTS
# ==================================================

@blood_request_bp.route("/", methods=["GET"])
@jwt_required()
def get_requests():


    requests = BloodRequest.query.order_by(

        BloodRequest.id.desc()

    ).all()



    return jsonify([

        req.to_dict()

        for req in requests

    ]),200







# ==================================================
# ADMIN REQUESTS
# ==================================================

@blood_request_bp.route("/admin", methods=["GET"])
@admin_required
def admin_get_requests():


    requests = BloodRequest.query.order_by(

        BloodRequest.id.desc()

    ).all()



    return jsonify([

        req.to_dict()

        for req in requests

    ]),200







# ==================================================
# SINGLE REQUEST
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_single_request(id):


    req = BloodRequest.query.get(id)



    if not req:

        return jsonify({

            "message":
            "Request not found"

        }),404



    return jsonify(

        req.to_dict()

    ),200







# ==================================================
# UPDATE STATUS ADMIN
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["PUT"])
@admin_required
def update_request(id):


    req = BloodRequest.query.get(id)



    if not req:

        return jsonify({

            "message":
            "Request not found"

        }),404



    data=request.get_json()



    if "status" in data:

        req.status=data["status"]



    db.session.commit()



    return jsonify({

        "message":
        "Updated successfully"

    }),200







# ==================================================
# DELETE REQUEST ADMIN
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["DELETE"])
@admin_required
def delete_request(id):


    req = BloodRequest.query.get(id)



    if not req:

        return jsonify({

            "message":
            "Request not found"

        }),404



    db.session.delete(req)

    db.session.commit()



    return jsonify({

        "message":
        "Deleted successfully"

    }),200







# ==================================================
# DONOR RESPOND
# ==================================================

@blood_request_bp.route(
    "/<int:id>/respond",
    methods=["POST"]
)
@jwt_required()
def donor_response(id):


    blood_request = BloodRequest.query.get(id)



    if not blood_request:

        return jsonify({

            "message":
            "Request not found"

        }),404




    data=request.get_json()



    response=data.get("response")

    feedback=data.get(
        "feedback",
        ""
    )



    donor_id=get_jwt_identity()



    donor=User.query.get(donor_id)



    existing=DonorResponse.query.filter_by(

        blood_request_id=id,

        donor_id=donor_id

    ).first()



    if existing:


        existing.response=response

        existing.feedback=feedback



    else:


        new_response=DonorResponse(

            blood_request_id=id,

            donor_id=donor_id,

            response=response,

            feedback=feedback

        )


        db.session.add(new_response)



    db.session.commit()





    # ===============================
    # EMAIL PATIENT
    # ===============================


    patient=User.query.get(

        blood_request.patient_id

    )



    if patient:


        html=build_template(

            title="Donor Response",

            heading="A donor responded to your request",

            message=f"""

<p>
Good news! A donor has responded to your blood request.
</p>

<p>
<b>Donor:</b> {donor.full_name}
</p>

<p>
<b>Response:</b> {response}
</p>

<p>
<b>Feedback:</b> {feedback}
</p>

<p>
<b>Blood Group:</b> {blood_request.blood_group}
</p>

"""

        )



        send_email(

            patient.email,

            "🩸 Donor Response - LifeLink",

            "A donor responded to your blood request.",

            html

        )





    return jsonify({

        "message":
        "Response submitted successfully"

    }),200







# ==================================================
# GET DONOR RESPONSES FOR REQUEST
# ==================================================

@blood_request_bp.route(
    "/<int:id>/responses",
    methods=["GET"]
)
@jwt_required()
def get_responses(id):


    responses = DonorResponse.query.filter_by(

        blood_request_id=id

    ).all()



    result=[]



    for r in responses:


        donor=User.query.get(

            r.donor_id

        )


        result.append({

            "id":r.id,

            "donor_name":
            donor.full_name if donor else "Unknown",

            "response":
            r.response,

            "feedback":
            r.feedback,

            "created_at":
            r.created_at

        })



    return jsonify(result),200