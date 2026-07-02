from flask import Blueprint, jsonify
from models.user import User
from models.blood_request import BloodRequest
from models.donation import Donation
from extensions import db
from utils.auth import admin_required

auth_admin_bp = Blueprint("auth_admin", __name__)


# ==================================================
# GET ALL USERS
# ==================================================
@auth_admin_bp.route("/users", methods=["GET"])
@admin_required
def get_users():

    users = User.query.order_by(User.id.desc()).all()

    return jsonify([user.to_dict() for user in users]), 200


# ==================================================
# GET DONORS
# ==================================================
@auth_admin_bp.route("/donors", methods=["GET"])
@admin_required
def get_donors():

    donors = User.query.filter_by(role="donor").all()

    return jsonify([donor.to_dict() for donor in donors]), 200


# ==================================================
# ADMIN DASHBOARD STATS
# ==================================================
@auth_admin_bp.route("/stats", methods=["GET"])
@admin_required
def admin_stats():

    total_users = User.query.count()

    total_donors = User.query.filter_by(
        role="donor"
    ).count()

    available_donors = User.query.filter_by(
        role="donor",
        availability="Available"
    ).count()

    total_patients = User.query.filter_by(
        role="patient"
    ).count()

    total_requests = BloodRequest.query.count()

    pending_requests = BloodRequest.query.filter_by(
        status="Pending"
    ).count()

    completed_requests = BloodRequest.query.filter_by(
        status="Completed"
    ).count()

    total_donations = Donation.query.count()

    return jsonify({

        "total_users": total_users,

        "total_donors": total_donors,

        "available_donors": available_donors,

        "total_patients": total_patients,

        "total_requests": total_requests,

        "pending_requests": pending_requests,

        "completed_requests": completed_requests,

        "total_donations": total_donations

    }), 200


# ==================================================
# DELETE USER
# ==================================================
@auth_admin_bp.route("/users/<int:id>", methods=["DELETE"])
@admin_required
def delete_user(id):

    user = User.query.get(id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "message": "User deleted successfully"
    }), 200