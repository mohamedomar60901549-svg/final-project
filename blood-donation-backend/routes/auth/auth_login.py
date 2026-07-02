from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

from models.user import User

auth_login_bp = Blueprint("auth_login", __name__)


@auth_login_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    print("\n========== LOGIN ==========")
    print("Email entered:", repr(email))

    users = User.query.all()

    print("\nUsers in database:")

    for u in users:
        print(
            f"ID={u.id} | EMAIL={repr(u.email)} | ROLE={u.role}"
        )

    print("-------------------------")

    user = User.query.filter_by(email=email).first()

    print("User object:", user)

    if not user:
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    print("Password Match:", check_password_hash(user.password, password))

    if not check_password_hash(user.password, password):
        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not user.is_verified:
        return jsonify({
            "message": "Verify email first"
        }), 403

    token = create_access_token(identity=str(user.id))

    print("LOGIN SUCCESS")

    return jsonify({
        "token": token,
        "user": user.to_dict()
    }), 200