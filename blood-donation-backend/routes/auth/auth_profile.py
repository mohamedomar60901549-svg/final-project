from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

auth_profile_bp = Blueprint("auth_profile", __name__)

@auth_profile_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user = User.query.get(int(get_jwt_identity()))

    if not user:
        return jsonify({"message": "Not found"}), 404

    return jsonify(user.to_dict()), 200