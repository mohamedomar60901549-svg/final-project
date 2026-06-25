from flask import Blueprint, request, jsonify

from extensions import db
from models.blood_request import BloodRequest


blood_request_bp = Blueprint(
    "blood_request",
    __name__
)


# CREATE BLOOD REQUEST
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

    return jsonify({
        "message": "Blood request created successfully"
    }), 201



# GET ALL BLOOD REQUESTS
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



# GET SINGLE REQUEST
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



# UPDATE REQUEST STATUS
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




# DELETE REQUEST
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