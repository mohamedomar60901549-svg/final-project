from flask import Blueprint, request, jsonify

from extensions import db
from models.blood_request import BloodRequest
from models.user import User
from utils.email_utils import send_email

from utils.auth import (
    patient_required,
    admin_required
)

from flask_jwt_extended import jwt_required


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
            "message": "Request body is required"
        }), 400


    blood_request = BloodRequest(
        patient_name=data["patient_name"],
        blood_group=data["blood_group"],
        units_needed=data["units_needed"],
        hospital=data["hospital"],
        location=data["location"]
    )


    db.session.add(blood_request)
    db.session.commit()



    # Notify matching donors

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

------------------------------------
Patient: {blood_request.patient_name}
Blood Group: {blood_request.blood_group}
Units Needed: {blood_request.units_needed}
Hospital: {blood_request.hospital}
Location: {blood_request.location}
------------------------------------

If you are available to donate blood, please log in to your LifeLink account.

Your donation could save a life.

Thank you for being a LifeLink donor.

LifeLink Blood Donation System
"""

            )

            emails_sent += 1


        except Exception as e:

            print(
                f"Failed sending email to {donor.email}: {e}"
            )


    return jsonify({

        "message": "Blood request created successfully",

        "matching_donors": len(donors),

        "emails_sent": emails_sent

    }), 201





# ==================================================
# GET ALL BLOOD REQUESTS
# DONOR + PATIENT + ADMIN CAN VIEW
# ==================================================

@blood_request_bp.route("/", methods=["GET"])
@jwt_required()
def get_requests():

    requests = BloodRequest.query.order_by(
        BloodRequest.id.desc()
    ).all()


    return jsonify([

        {

            "id": req.id,

            "patient_name": req.patient_name,

            "blood_group": req.blood_group,

            "units_needed": req.units_needed,

            "hospital": req.hospital,

            "location": req.location,

            "status": req.status,

            "created_at": req.created_at

        }

        for req in requests

    ]), 200





# ==================================================
# ADMIN GET ALL REQUESTS
# SEPARATE ADMIN MANAGEMENT ROUTE
# ==================================================

@blood_request_bp.route("/admin", methods=["GET"])
@admin_required
def admin_get_requests():

    requests = BloodRequest.query.order_by(
        BloodRequest.id.desc()
    ).all()


    return jsonify([

        {

            "id": req.id,

            "patient_name": req.patient_name,

            "blood_group": req.blood_group,

            "units_needed": req.units_needed,

            "hospital": req.hospital,

            "location": req.location,

            "status": req.status,

            "created_at": req.created_at

        }

        for req in requests

    ]), 200





# ==================================================
# GET SINGLE REQUEST
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_single_request(id):

    req = BloodRequest.query.get(id)


    if not req:

        return jsonify({

            "message": "Request not found"

        }), 404



    return jsonify({

        "id": req.id,

        "patient_name": req.patient_name,

        "blood_group": req.blood_group,

        "units_needed": req.units_needed,

        "hospital": req.hospital,

        "location": req.location,

        "status": req.status,

        "created_at": req.created_at

    }), 200





# ==================================================
# UPDATE REQUEST STATUS (ADMIN)
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["PUT"])
@admin_required
def update_request(id):

    req = BloodRequest.query.get(id)


    if not req:

        return jsonify({

            "message": "Request not found"

        }), 404



    data = request.get_json()


    if not data:

        return jsonify({

            "message": "Request body is required"

        }), 400



    if "status" in data:

        req.status = data["status"]


    db.session.commit()


    return jsonify({

        "message": "Blood request updated successfully"

    }), 200





# ==================================================
# DELETE REQUEST (ADMIN)
# ==================================================

@blood_request_bp.route("/<int:id>", methods=["DELETE"])
@admin_required
def delete_request(id):

    req = BloodRequest.query.get(id)


    if not req:

        return jsonify({

            "message": "Request not found"

        }), 404



    db.session.delete(req)

    db.session.commit()


    return jsonify({

        "message": "Blood request deleted successfully"

    }), 200