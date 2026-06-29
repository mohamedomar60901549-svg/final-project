from flask import Blueprint, request, jsonify

from extensions import db
from models.blood_request import BloodRequest
from models.user import User
from utils.email_utils import send_email


blood_request_bp = Blueprint(
    "blood_request",
    __name__
)


# ================= CREATE BLOOD REQUEST =================

@blood_request_bp.route("/", methods=["POST"])
def create_request():

    data = request.get_json()

    blood_request = BloodRequest(
        patient_name=data["patient_name"],
        blood_group=data["blood_group"],
        units_needed=data["units_needed"],
        hospital=data["hospital"],
        location=data["location"]
    )

    db.session.add(blood_request)
    db.session.commit()

    # ============================================
    # Notify Matching Donors
    # ============================================

    donors = User.query.filter_by(
        role="donor",
        blood_group=data["blood_group"],
        availability="available"
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

If you are available to donate blood, please log in to your LifeLink account and respond as soon as possible.

Your donation could save a life.

Thank you for being a LifeLink donor.

LifeLink Blood Donation System
                """
            )

            emails_sent += 1

        except Exception as e:
            print(f"Failed to send email to {donor.email}: {e}")

    return jsonify({
        "message": "Blood request created successfully",
        "matching_donors": len(donors),
        "emails_sent": emails_sent
    }), 201


# ================= GET ALL BLOOD REQUESTS =================

@blood_request_bp.route("/", methods=["GET"])
def get_requests():

    requests = BloodRequest.query.all()

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


# ================= GET SINGLE REQUEST =================

@blood_request_bp.route("/<int:id>", methods=["GET"])
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


# ================= UPDATE REQUEST STATUS =================

@blood_request_bp.route("/<int:id>", methods=["PUT"])
def update_request(id):

    req = BloodRequest.query.get(id)

    if not req:
        return jsonify({
            "message": "Request not found"
        }), 404

    data = request.get_json()

    if "status" in data:
        req.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Blood request updated successfully"
    }), 200


# ================= DELETE REQUEST =================

@blood_request_bp.route("/<int:id>", methods=["DELETE"])
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