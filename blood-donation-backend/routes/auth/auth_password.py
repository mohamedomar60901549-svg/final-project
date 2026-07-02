from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models.user import User
from utils.email_utils import send_reset_email
import secrets
from datetime import datetime, timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_password_bp = Blueprint("auth_password", __name__)

# FORGOT PASSWORD
@auth_password_bp.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()
    email = data.get("email", "").strip().lower()

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "ok"}), 200

    token = secrets.token_urlsafe(32)
    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)

    db.session.commit()

    send_reset_email(user, token)

    return jsonify({"message": "reset sent"}), 200


# RESET PASSWORD
@auth_password_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):

    data = request.get_json()
    password = data.get("password", "")

    user = User.query.filter_by(reset_token=token).first()

    if not user:
        return jsonify({"message": "invalid"}), 400

    if datetime.utcnow() > user.reset_token_expiry:
        return jsonify({"message": "expired"}), 400

    user.password = generate_password_hash(password)
    user.reset_token = None
    user.reset_token_expiry = None

    db.session.commit()

    return jsonify({"message": "success"}), 200


# CHANGE PASSWORD
@auth_password_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    user = User.query.get(int(get_jwt_identity()))
    data = request.get_json()

    if not check_password_hash(user.password, data["current_password"]):
        return jsonify({"message": "wrong password"}), 400

    user.password = generate_password_hash(data["new_password"])

    db.session.commit()

    return jsonify({"message": "updated"}), 200