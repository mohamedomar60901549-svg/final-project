from flask import Blueprint, request, jsonify

from extensions import db
from models.donation import Donation
from models.user import User


donation_bp = Blueprint(
    "donation",
    __name__
)


# ===========================
# CREATE DONATION
# ===========================
@donation_bp.route("/", methods=["POST"])
def create_donation():

    data = request.get_json()

    donor_id = data.get("donor_id")
    hospital = data.get("hospital")

    if not donor_id:
        return jsonify({
            "message": "Donor ID is required."
        }), 400

    if not hospital:
        return jsonify({
            "message": "Hospital is required."
        }), 400

    user = User.query.get(donor_id)

    if not user:
        return jsonify({
            "message": "Donor not found."
        }), 404

    if user.role.lower() != "donor":
        return jsonify({
            "message": "Selected user is not a donor."
        }), 400

    if not user.blood_group:
        return jsonify({
            "message": "This donor has no blood group assigned."
        }), 400

    donation = Donation(
        donor_id=user.id,
        hospital=hospital,
        blood_group=user.blood_group,
        status="Completed"
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({
        "message": "Donation recorded successfully.",
        "donation": {
            "id": donation.id,
            "donor_id": user.id,
            "donor_name": user.full_name,
            "hospital": donation.hospital,
            "blood_group": user.blood_group,
            "donation_date": donation.donation_date,
            "status": donation.status
        }
    }), 201


# ===========================
# GET ALL DONATIONS
# ===========================
@donation_bp.route("/", methods=["GET"])
def get_donations():

    donations = Donation.query.all()

    donation_list = []

    for donation in donations:

        user = User.query.get(donation.donor_id)

        donation_list.append({

            "id": donation.id,

            "donor_id": donation.donor_id,

            "donor_name": user.full_name if user else "Unknown",

            "hospital": donation.hospital,

            # Always display the donor's registered blood group
            "blood_group": user.blood_group if user else donation.blood_group,

            "donation_date": donation.donation_date,

            "status": donation.status

        })

    return jsonify(donation_list), 200


# ===========================
# GET ONE DONATION
# ===========================
@donation_bp.route("/<int:id>", methods=["GET"])
def get_donation(id):

    donation = Donation.query.get(id)

    if not donation:
        return jsonify({
            "message": "Donation not found."
        }), 404

    user = User.query.get(donation.donor_id)

    return jsonify({

        "id": donation.id,

        "donor_id": donation.donor_id,

        "donor_name": user.full_name if user else "Unknown",

        "hospital": donation.hospital,

        "blood_group": user.blood_group if user else donation.blood_group,

        "donation_date": donation.donation_date,

        "status": donation.status

    }), 200


# ===========================
# UPDATE DONATION
# ===========================
@donation_bp.route("/<int:id>", methods=["PUT"])
def update_donation(id):

    donation = Donation.query.get(id)

    if not donation:
        return jsonify({
            "message": "Donation not found."
        }), 404

    data = request.get_json()

    if "hospital" in data:
        donation.hospital = data["hospital"]

    if "status" in data:
        donation.status = data["status"]

    db.session.commit()

    user = User.query.get(donation.donor_id)

    return jsonify({

        "message": "Donation updated successfully.",

        "donation": {

            "id": donation.id,

            "donor_id": donation.donor_id,

            "donor_name": user.full_name if user else "Unknown",

            "hospital": donation.hospital,

            "blood_group": user.blood_group if user else donation.blood_group,

            "donation_date": donation.donation_date,

            "status": donation.status

        }

    }), 200


# ===========================
# DELETE DONATION
# ===========================
@donation_bp.route("/<int:id>", methods=["DELETE"])
def delete_donation(id):

    donation = Donation.query.get(id)

    if not donation:
        return jsonify({
            "message": "Donation not found."
        }), 404

    db.session.delete(donation)
    db.session.commit()

    return jsonify({
        "message": "Donation deleted successfully."
    }), 200