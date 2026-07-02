from flask import Blueprint, request, jsonify
import secrets
import re
from werkzeug.security import generate_password_hash

from extensions import db
from models.user import User
from utils.email_utils import send_verification_email


auth_register_bp = Blueprint("auth_register", __name__)


@auth_register_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({"message": "Request body is required."}), 400

    required_fields = ["full_name", "email", "phone", "password", "role", "blood_group"]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"{field} is required."}), 400

    email = data["email"].strip().lower()

    if not re.match(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$", email):
        return jsonify({"message": "Invalid email format."}), 400

    if len(data["password"]) < 8:
        return jsonify({"message": "Password too short."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already exists."}), 409

    if User.query.filter_by(phone=data["phone"]).first():
        return jsonify({"message": "Phone already exists."}), 409

    token = secrets.token_urlsafe(32)

    user = User(
        full_name=data["full_name"].strip(),
        email=email,
        phone=data["phone"].strip(),
        password=generate_password_hash(data["password"]),
        role=data["role"],
        blood_group=data["blood_group"],
        location=data.get("location", "Nairobi"),
        availability=data.get("availability", "Available"),
        is_verified=False,
        verification_token=token
    )

    db.session.add(user)
    db.session.commit()

    send_verification_email(user)

    return jsonify({
        "message": "Registration successful. Check your email."
    }), 201


# ==================================================
# EMAIL VERIFICATION (IMPORTANT PART YOU WERE MISSING)
# ==================================================

@auth_register_bp.route("/verify-email/<token>", methods=["GET"])
def verify_email(token):

    user = User.query.filter_by(verification_token=token).first()

    if not user:
        return jsonify({"message": "Invalid or expired verification link."}), 400

    if user.is_verified:
        return jsonify({"message": "Email already verified."}), 200

    user.is_verified = True
    user.verification_token = None

    db.session.commit()

    return jsonify({"message": "Email verified successfully."}), 200