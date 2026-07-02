from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.user import User

auth_profile_bp = Blueprint("auth_profile", __name__)


# ==================================================
# GET PROFILE
# ==================================================

@auth_profile_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user = User.query.get(int(get_jwt_identity()))

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify(user.to_dict()), 200


# ==================================================
# UPDATE DONOR AVAILABILITY
# ==================================================

@auth_profile_bp.route("/availability", methods=["PUT"])
@jwt_required()
def update_availability():

    user = User.query.get(int(get_jwt_identity()))

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404

    data = request.get_json()

    if not data or "availability" not in data:
        return jsonify({
            "message": "Availability is required"
        }), 400

    availability = data["availability"]

    if availability not in ["Available", "Unavailable"]:
        return jsonify({
            "message": "Invalid availability value"
        }), 400

    user.availability = availability

    db.session.commit()

    return jsonify({
        "message": "Availability updated successfully",
        "availability": user.availability
    }), 200