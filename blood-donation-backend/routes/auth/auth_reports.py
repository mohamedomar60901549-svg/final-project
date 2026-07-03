from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models.user import User
from models.blood_request import BloodRequest
from models.donation import Donation

from utils.auth import admin_required

auth_reports_bp = Blueprint("auth_reports", __name__)


@auth_reports_bp.route("/reports", methods=["GET"])
@jwt_required()
@admin_required
def reports():

    total_users = User.query.count()

    total_donors = User.query.filter_by(role="donor").count()

    total_patients = User.query.filter_by(role="patient").count()

    available_donors = User.query.filter_by(
        role="donor",
        availability="available"
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
        "total_patients": total_patients,
        "available_donors": available_donors,
        "total_requests": total_requests,
        "pending_requests": pending_requests,
        "completed_requests": completed_requests,
        "total_donations": total_donations,
    }), 200