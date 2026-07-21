from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db

from models.user import User
from models.blood_request import BloodRequest
from models.donation_response import DonationResponse

from utils.auth import (
    donor_required,
    admin_required
)

donation_response_bp = Blueprint(
    "donation_response",
    __name__
)

# ==================================================
# DONOR RESPONDS TO A BLOOD REQUEST
# ==================================================

@donation_response_bp.route("/", methods=["POST"])
@donor_required
def respond_to_request():

    donor = User.query.get(int(get_jwt_identity()))

    if not donor:
        return jsonify({
            "message": "Donor not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Request body is required"
        }), 400

    required = [
        "request_id",
        "response"
    ]

    for field in required:

        if field not in data:

            return jsonify({
                "message": f"{field} is required"
            }), 400

    blood_request = BloodRequest.query.get(
        data["request_id"]
    )

    if not blood_request:

        return jsonify({
            "message": "Blood request not found"
        }), 404

    existing = DonationResponse.query.filter_by(
        donor_id=donor.id,
        request_id=blood_request.id
    ).first()

    if existing:

        return jsonify({
            "message": "You have already responded to this request."
        }), 409

    response = data["response"]

    if response not in [
        "Accepted",
        "Declined"
    ]:

        return jsonify({
            "message": "Invalid response."
        }), 400

    donation_response = DonationResponse(

        donor_id=donor.id,

        request_id=blood_request.id,

        response=response,

        feedback=data.get(
            "feedback",
            ""
        )

    )

    db.session.add(
        donation_response
    )

    db.session.commit()

    return jsonify({

        "message": "Response submitted successfully.",

        "response": donation_response.to_dict()

    }), 201


# ==================================================
# DONOR'S OWN RESPONSES
# ==================================================

@donation_response_bp.route("/my-responses", methods=["GET"])
@donor_required
def my_responses():

    donor = User.query.get(
        int(get_jwt_identity())
    )

    responses = DonationResponse.query.filter_by(
        donor_id=donor.id
    ).order_by(
        DonationResponse.responded_at.desc()
    ).all()

    return jsonify([

        r.to_dict()

        for r in responses

    ]), 200


# ==================================================
# GET RESPONSES FOR ONE REQUEST
# ==================================================

@donation_response_bp.route(
    "/request/<int:request_id>",
    methods=["GET"]
)
@jwt_required()
def request_responses(request_id):

    responses = DonationResponse.query.filter_by(
        request_id=request_id
    ).order_by(
        DonationResponse.responded_at.desc()
    ).all()

    return jsonify([

        r.to_dict()

        for r in responses

    ]), 200


# ==================================================
# ADMIN GET ALL RESPONSES
# ==================================================

@donation_response_bp.route(
    "/admin",
    methods=["GET"]
)
@admin_required
def admin_get_all():

    responses = DonationResponse.query.order_by(
        DonationResponse.responded_at.desc()
    ).all()

    return jsonify([

        r.to_dict()

        for r in responses

    ]), 200