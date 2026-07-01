from flask import Blueprint, request, jsonify
import re
import secrets
from datetime import datetime, timedelta

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from extensions import db
from utils.email_utils import send_email
from models.user import User
from utils.auth import admin_required


auth_bp = Blueprint(
    "auth",
    __name__
)


# ==================================================
# REGISTER USER
# ==================================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    required_fields = [
        "full_name",
        "email",
        "phone",
        "password",
        "role",
        "blood_group"
    ]

    for field in required_fields:

        if not data.get(field):

            return jsonify({
                "message": f"{field.replace('_', ' ').title()} is required."
            }), 400

    full_name = data["full_name"].strip()

    email = data["email"].strip().lower()

    phone = data["phone"].strip()

    password = data["password"]

    role = data.get(
        "role",
        "donor"
    )

    blood_group = data.get(
        "blood_group"
    )

    location = data.get(
        "location",
        "Nairobi"
    )

    availability = data.get(
        "availability",
        "Available"
    )

    email_pattern = (
        r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    )

    if not re.match(email_pattern, email):

        return jsonify({
            "message": "Please enter a valid email address."
        }), 400

    if len(password) < 8:

        return jsonify({
            "message": "Password must be at least 8 characters long."
        }), 400

    existing_email = User.query.filter_by(
        email=email
    ).first()

    if existing_email:

        return jsonify({
            "message": "Email already exists."
        }), 409

    existing_phone = User.query.filter_by(
        phone=phone
    ).first()

    if existing_phone:

        return jsonify({
            "message": "Phone number already exists."
        }), 409

    verification_token = secrets.token_urlsafe(32)

    user = User(

        full_name=full_name,

        email=email,

        phone=phone,

        password=generate_password_hash(password),

        role=role,

        blood_group=blood_group,

        location=location,

        availability=availability,

        is_verified=False,

        verification_token=verification_token

    )

    db.session.add(user)

    db.session.commit()

    verification_link = (
        f"http://localhost:5173/verify-email/{verification_token}"
    )

    try:

        send_email(

            user.email,

            "Verify Your LifeLink Account",

            f"""
Hello {user.full_name},

Welcome to LifeLink Blood Donation System!

Your account has been created successfully.

Before you can log in, please verify your email by clicking the link below.

{verification_link}

If you did not create this account, simply ignore this email.

Regards,

LifeLink Blood Donation System
"""

        )

    except Exception as e:

        print("Verification email failed:", e)

    return jsonify({

        "message":
        "Registration successful. Please verify your email before logging in."

    }), 201


# ==================================================
# VERIFY EMAIL
# ==================================================

@auth_bp.route("/verify-email/<token>", methods=["GET"])
def verify_email(token):

    user = User.query.filter_by(
        verification_token=token
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid verification link."
        }), 400

    if user.is_verified:

        return jsonify({
            "message": "Email already verified."
        }), 200

    user.is_verified = True

    user.verification_token = None

    db.session.commit()

    return jsonify({

        "message":
        "Email verified successfully. You can now log in."

    }), 200

# ==================================================
# LOGIN
# ==================================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    email = data.get(
        "email",
        ""
    ).strip().lower()

    password = data.get(
        "password",
        ""
    )

    if not email or not password:

        return jsonify({
            "message": "Email and password are required."
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid email or password."
        }), 401

    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "message": "Invalid email or password."
        }), 401

    if not user.is_verified:

        return jsonify({
            "message":
            "Please verify your email before logging in."
        }), 403

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "token": token,

        "user": user.to_dict()

    }), 200


# ==================================================
# PROFILE
# ==================================================

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:

        return jsonify({
            "message": "User not found."
        }), 404

    return jsonify(
        user.to_dict()
    ), 200


# ==================================================
# GET ALL USERS (ADMIN)
# ==================================================

@auth_bp.route("/users", methods=["GET"])
@admin_required
def get_users():

    users = User.query.order_by(
        User.id.desc()
    ).all()

    return jsonify([
        user.to_dict()
        for user in users
    ]), 200


# ==================================================
# ADMIN DASHBOARD STATISTICS
# ==================================================

@auth_bp.route("/stats", methods=["GET"])
@admin_required
def stats():

    total_users = User.query.count()

    total_donors = User.query.filter_by(
        role="donor"
    ).count()

    total_patients = User.query.filter_by(
        role="patient"
    ).count()

    verified_users = User.query.filter_by(
        is_verified=True
    ).count()

    unverified_users = User.query.filter_by(
        is_verified=False
    ).count()

    available_donors = User.query.filter_by(
        role="donor",
        availability="Available"
    ).count()

    unavailable_donors = User.query.filter_by(
        role="donor",
        availability="Unavailable"
    ).count()

    return jsonify({

        "total_users": total_users,

        "total_donors": total_donors,

        "total_patients": total_patients,

        "verified_users": verified_users,

        "unverified_users": unverified_users,

        "available_donors": available_donors,

        "unavailable_donors": unavailable_donors

    }), 200

# ==================================================
# DELETE USER
# ==================================================

@auth_bp.route("/users/<int:id>", methods=["DELETE"])
@admin_required
def delete_user(id):

    user = User.query.get(id)

    if not user:

        return jsonify({
            "message": "User not found."
        }), 404

    db.session.delete(user)

    db.session.commit()

    return jsonify({

        "message": "User deleted successfully."

    }), 200


# ==================================================
# UPDATE USER
# ==================================================

@auth_bp.route("/users/<int:id>", methods=["PUT"])
@admin_required
def update_user(id):

    user = User.query.get(id)

    if not user:

        return jsonify({
            "message": "User not found."
        }), 404

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    new_email = data.get(
        "email",
        user.email
    ).strip().lower()

    existing_email = User.query.filter(
        User.email == new_email,
        User.id != user.id
    ).first()

    if existing_email:

        return jsonify({
            "message": "Email already exists."
        }), 409

    new_phone = data.get(
        "phone",
        user.phone
    ).strip()

    existing_phone = User.query.filter(
        User.phone == new_phone,
        User.id != user.id
    ).first()

    if existing_phone:

        return jsonify({
            "message": "Phone number already exists."
        }), 409

    user.full_name = data.get(
        "full_name",
        user.full_name
    ).strip()

    user.email = new_email

    user.phone = new_phone

    user.role = data.get(
        "role",
        user.role
    )

    user.blood_group = data.get(
        "blood_group",
        user.blood_group
    )

    user.location = data.get(
        "location",
        user.location
    )

    user.availability = data.get(
        "availability",
        user.availability
    )

    if "is_verified" in data:

        user.is_verified = data["is_verified"]

    db.session.commit()

    return jsonify({

        "message": "User updated successfully.",

        "user": user.to_dict()

    }), 200


# ==================================================
# GET ALL DONORS
# ==================================================

@auth_bp.route("/donors", methods=["GET"])
@jwt_required()
def get_donors():

    donors = User.query.filter_by(
        role="donor"
    ).order_by(
        User.full_name.asc()
    ).all()

    return jsonify([
        donor.to_dict()
        for donor in donors
    ]), 200


# ==================================================
# UPDATE DONOR AVAILABILITY
# ==================================================

@auth_bp.route("/availability", methods=["PUT"])
@jwt_required()
def update_availability():

    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:

        return jsonify({
            "message": "User not found."
        }), 404

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    availability = data.get(
        "availability"
    )

    if availability not in [
        "Available",
        "Unavailable"
    ]:

        return jsonify({
            "message":
            "Availability must be either 'Available' or 'Unavailable'."
        }), 400

    user.availability = availability

    db.session.commit()

    return jsonify({

        "message": "Availability updated successfully.",

        "availability": user.availability

    }), 200

# ==================================================
# FORGOT PASSWORD
# ==================================================

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    email = data.get(
        "email",
        ""
    ).strip().lower()

    if not email:

        return jsonify({
            "message": "Email is required."
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    # Prevent email enumeration
    if not user:

        return jsonify({
            "message":
            "If an account exists, a password reset email has been sent."
        }), 200

    token = secrets.token_urlsafe(32)

    user.reset_token = token

    user.reset_token_expiry = (
        datetime.utcnow() + timedelta(hours=1)
    )

    db.session.commit()

    reset_link = (
        f"http://localhost:5173/reset-password/{token}"
    )

    try:

        send_email(

            user.email,

            "Reset Your LifeLink Password",

            f"""
Hello {user.full_name},

We received a request to reset your LifeLink account password.

Click the link below to create a new password.

{reset_link}

This password reset link will expire in 1 hour.

If you did not request this password reset, you can safely ignore this email.

Regards,

LifeLink Blood Donation System
"""

        )

    except Exception as e:

        print("Password reset email failed:", e)

    return jsonify({

        "message":
        "If an account exists, a password reset email has been sent."

    }), 200


# ==================================================
# RESET PASSWORD
# ==================================================

@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    password = data.get(
        "password",
        ""
    )

    if not password:

        return jsonify({
            "message": "Password is required."
        }), 400

    if len(password) < 8:

        return jsonify({
            "message":
            "Password must be at least 8 characters long."
        }), 400

    user = User.query.filter_by(
        reset_token=token
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid reset token."
        }), 400

    if user.reset_token_expiry is None:

        return jsonify({
            "message": "Reset token is invalid."
        }), 400

    if datetime.utcnow() > user.reset_token_expiry:

        return jsonify({
            "message": "Reset token has expired."
        }), 400

    user.password = generate_password_hash(
        password
    )

    user.reset_token = None

    user.reset_token_expiry = None

    db.session.commit()

    return jsonify({

        "message":
        "Password has been reset successfully. You can now log in."

    }), 200

# ==================================================
# RESEND VERIFICATION EMAIL
# ==================================================

@auth_bp.route("/resend-verification", methods=["POST"])
def resend_verification():

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    email = data.get(
        "email",
        ""
    ).strip().lower()

    if not email:

        return jsonify({
            "message": "Email is required."
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    # Prevent email enumeration
    if not user:

        return jsonify({
            "message":
            "If an account exists and is not verified, a verification email has been sent."
        }), 200

    if user.is_verified:

        return jsonify({
            "message": "Email is already verified."
        }), 200

    token = secrets.token_urlsafe(32)

    user.verification_token = token

    db.session.commit()

    verification_link = (
        f"http://localhost:5173/verify-email/{token}"
    )

    try:

        send_email(

            user.email,

            "Verify Your LifeLink Account",

            f"""
Hello {user.full_name},

Thank you for using the LifeLink Blood Donation System.

Please verify your email address by clicking the link below.

{verification_link}

If you did not create this account, you may safely ignore this email.

Regards,

LifeLink Blood Donation System
"""

        )

    except Exception as e:

        print("Verification email failed:", e)

    return jsonify({

        "message":
        "Verification email has been sent successfully."

    }), 200


# ==================================================
# CHANGE PASSWORD
# ==================================================

@auth_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:

        return jsonify({
            "message": "User not found."
        }), 404

    data = request.get_json()

    if not data:

        return jsonify({
            "message": "Request body is required."
        }), 400

    current_password = data.get(
        "current_password",
        ""
    )

    new_password = data.get(
        "new_password",
        ""
    )

    if not current_password or not new_password:

        return jsonify({
            "message":
            "Current password and new password are required."
        }), 400

    if not check_password_hash(
        user.password,
        current_password
    ):

        return jsonify({
            "message": "Current password is incorrect."
        }), 400

    if len(new_password) < 8:

        return jsonify({
            "message":
            "New password must be at least 8 characters long."
        }), 400

    if check_password_hash(
        user.password,
        new_password
    ):

        return jsonify({
            "message":
            "New password must be different from the current password."
        }), 400

    user.password = generate_password_hash(
        new_password
    )

    db.session.commit()

    return jsonify({

        "message":
        "Password changed successfully."

    }), 200


# ==================================================
# CHECK EMAIL VERIFICATION STATUS
# ==================================================

@auth_bp.route("/verification-status/<email>", methods=["GET"])
def verification_status(email):

    user = User.query.filter_by(
        email=email.strip().lower()
    ).first()

    if not user:

        return jsonify({

            "verified": False

        }), 200

    return jsonify({

        "verified": user.is_verified

    }), 200


# ==================================================
# VALIDATE JWT TOKEN
# ==================================================

@auth_bp.route("/validate-token", methods=["GET"])
@jwt_required()
def validate_token():

    user_id = get_jwt_identity()

    user = User.query.get(
        int(user_id)
    )

    if not user:

        return jsonify({

            "valid": False

        }), 401

    return jsonify({

        "valid": True,

        "user": user.to_dict()

    }), 200