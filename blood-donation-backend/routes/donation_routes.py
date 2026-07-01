from flask import Blueprint, request, jsonify

from extensions import db
from models.donation import Donation
from models.user import User

from utils.auth import (
    donor_required,
    admin_required
)

from flask_jwt_extended import jwt_required


donation_bp = Blueprint(
    "donation",
    __name__
)



# ===========================
# CREATE DONATION (DONOR)
# ===========================

@donation_bp.route("/", methods=["POST"])
@donor_required
def create_donation():

    data = request.get_json()


    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400


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



    donor = User.query.get(donor_id)



    if not donor:

        return jsonify({
            "message": "Donor not found."
        }), 404



    if donor.role.lower() != "donor":

        return jsonify({
            "message": "Selected user is not a donor."
        }), 400



    donation = Donation(

        donor_id=donor.id,

        hospital=hospital,

        blood_group=donor.blood_group,

        status="Completed"

    )



    db.session.add(donation)

    db.session.commit()



    return jsonify({

        "message":
        "Donation recorded successfully.",

        "donation": {

            "id": donation.id,

            "donor_name": donor.full_name,

            "hospital": donation.hospital,

            "blood_group": donation.blood_group,

            "status": donation.status

        }

    }), 201






# ===========================
# GET ALL DONATIONS
# ADMIN + LOGGED USERS
# ===========================

@donation_bp.route("/", methods=["GET"])
@jwt_required()
def get_donations():


    donations = Donation.query.all()


    result = []



    for donation in donations:


        donor = User.query.get(
            donation.donor_id
        )



        result.append({

            "id": donation.id,

            "donor_id": donation.donor_id,

            "donor_name":
            donor.full_name if donor else "Unknown",

            "hospital":
            donation.hospital,

            "blood_group":
            donor.blood_group if donor else donation.blood_group,

            "donation_date":
            donation.donation_date,

            "status":
            donation.status

        })



    return jsonify(result), 200







# ===========================
# GET SINGLE DONATION
# ===========================

@donation_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_donation(id):


    donation = Donation.query.get(id)



    if not donation:

        return jsonify({

            "message":
            "Donation not found."

        }), 404



    donor = User.query.get(
        donation.donor_id
    )



    return jsonify({

        "id": donation.id,

        "donor_name":
        donor.full_name if donor else "Unknown",

        "hospital":
        donation.hospital,

        "blood_group":
        donation.blood_group,

        "status":
        donation.status

    }), 200







# ===========================
# UPDATE DONATION
# ADMIN ONLY
# ===========================

@donation_bp.route("/<int:id>", methods=["PUT"])
@admin_required
def update_donation(id):


    donation = Donation.query.get(id)



    if not donation:

        return jsonify({

            "message":
            "Donation not found."

        }),404



    data = request.get_json()



    if "hospital" in data:

        donation.hospital = data["hospital"]



    if "status" in data:

        donation.status = data["status"]



    db.session.commit()



    return jsonify({

        "message":
        "Donation updated successfully."

    }),200







# ===========================
# DELETE DONATION
# ADMIN ONLY
# ===========================

@donation_bp.route("/<int:id>", methods=["DELETE"])
@admin_required
def delete_donation(id):


    donation = Donation.query.get(id)



    if not donation:

        return jsonify({

            "message":
            "Donation not found."

        }),404



    db.session.delete(donation)

    db.session.commit()



    return jsonify({

        "message":
        "Donation deleted successfully."

    }),200