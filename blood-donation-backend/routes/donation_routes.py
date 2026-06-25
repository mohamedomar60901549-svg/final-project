from flask import Blueprint, request, jsonify

from extensions import db
from models.donation import Donation


donation_bp = Blueprint(
    "donation",
    __name__
)


@donation_bp.route("/", methods=["POST"])
def create_donation():

    data = request.get_json()

    donation = Donation(
        donor_id=data["donor_id"],
        blood_request_id=data["blood_request_id"]
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({
        "message": "Donation recorded successfully"
    }), 201



@donation_bp.route("/", methods=["GET"])
def get_donations():

    donations = Donation.query.all()

    return jsonify([
        donation.to_dict()
        for donation in donations
    ]), 200



@donation_bp.route("/<int:id>", methods=["PUT"])
def update_donation(id):

    donation = Donation.query.get(id)

    if not donation:
        return jsonify({
            "message": "Donation not found"
        }), 404


    data = request.get_json()

    donation.status = data.get(
        "status",
        donation.status
    )

    db.session.commit()

    return jsonify({
        "message": "Donation status updated"
    }), 200