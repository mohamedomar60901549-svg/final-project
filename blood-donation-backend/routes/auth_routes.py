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

# ================= REGISTER USER =================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    # Validate required fields
    required_fields = [
        "full_name",
        "email",
        "phone",
        "password",
        "role",
        "blood_group",
    ]

    for field in required_fields:
        if not data.get(field):
            return jsonify({
                "message": f"{field.replace('_', ' ').title()} is required"
            }), 400

    # Validate email format
    email_pattern = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    if not re.match(email_pattern, data["email"]):
        return jsonify({
            "message": "Please enter a valid email address."
        }), 400

    # Check if email already exists
    existing_email = User.query.filter_by(
        email=data["email"]
    ).first()

    if existing_email:
        return jsonify({
            "message": "Email already exists"
        }), 409

    # Check if phone already exists
    existing_phone = User.query.filter_by(
        phone=data["phone"]
    ).first()

    if existing_phone:
        return jsonify({
            "message": "Phone number already exists"
        }), 409

    # Create new user
    user = User(
        full_name=data["full_name"].strip(),
        email=data["email"].strip().lower(),
        phone=data["phone"].strip(),
        password=generate_password_hash(
            data["password"]
        ),
        role=data.get("role", "donor"),
        blood_group=data.get("blood_group"),
        location=data.get("location", "Nairobi"),
        availability=data.get("availability", "available")
    )

    db.session.add(user)
    db.session.commit()

    # ================= SEND WELCOME EMAIL =================
    try:
        send_email(
            user.email,
            "Welcome to LifeLink Blood Donation System",
            f"""
Hello {user.full_name},

Welcome to LifeLink 🩸

Your account has been created successfully.

Account Details
-----------------------
Name: {user.full_name}
Email: {user.email}
Role: {user.role}
Blood Group: {user.blood_group}
Location: {user.location}

Thank you for joining the LifeLink Blood Donation System.

Your willingness to donate blood can help save lives.

Stay available, stay safe, and thank you for being part of our community.

Best Regards,

LifeLink Blood Donation Team
            """
        )
    except Exception as e:
        print(f"Email sending failed: {e}")

    # Automatically log the user in
    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "message": "Registration successful",
        "token": token,
        "user": user.to_dict()
    }), 201






# ================= LOGIN USER =================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()


    user = User.query.filter_by(
        email=data["email"]
    ).first()



    if not user:

        return jsonify({

            "message": "Invalid email or password"

        }), 401




    if not check_password_hash(
        user.password,
        data["password"]
    ):

        return jsonify({

            "message": "Invalid email or password"

        }), 401




    token = create_access_token(

        identity=str(user.id)

    )



    return jsonify({

        "token": token,

        "user": user.to_dict()

    }), 200





# ================= PROFILE =================

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()


    user = User.query.get(
        int(user_id)
    )


    if not user:

        return jsonify({

            "message": "User not found"

        }), 404




    return jsonify({

        "id": user.id,

        "full_name": user.full_name,

        "email": user.email,

        "phone": user.phone,

        "role": user.role,

        "blood_group": user.blood_group,

        "location": user.location,

        "availability": user.availability

    }), 200





# ================= GET ALL USERS =================

@auth_bp.route("/users", methods=["GET"])
@admin_required
def get_users():


    users = User.query.all()


    result = []


    for user in users:


        result.append({

            "id": user.id,

            "full_name": user.full_name,

            "email": user.email,

            "phone": user.phone,

            "role": user.role,

            "blood_group": user.blood_group,

            "location": user.location,

            "availability": user.availability

        })


    return jsonify(result), 200





# ================= ADMIN STATISTICS =================

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



    return jsonify({

        "total_users": total_users,

        "total_donors": total_donors,

        "total_patients": total_patients

    }), 200





# ================= DELETE USER =================

@auth_bp.route("/users/<int:id>", methods=["DELETE"])
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





# ================= UPDATE USER =================

@auth_bp.route("/users/<int:id>", methods=["PUT"])
@admin_required
def update_user(id):

    user = User.query.get(id)


    if not user:

        return jsonify({

            "message": "User not found"

        }), 404



    data = request.get_json()



    user.full_name = data.get(
        "full_name",
        user.full_name
    )


    user.email = data.get(
        "email",
        user.email
    )


    user.phone = data.get(
        "phone",
        user.phone
    )


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



    db.session.commit()



    return jsonify({

        "message": "User updated successfully"

    }), 200





# ================= GET ALL DONORS =================

@auth_bp.route("/donors", methods=["GET"])
@jwt_required()
def get_donors():

    donors = User.query.filter_by(
        role="donor"
    ).all()


    result = []


    for donor in donors:

        result.append({

            "id": donor.id,

            "full_name": donor.full_name,

            "email": donor.email,

            "phone": donor.phone,

            "blood_group": donor.blood_group,

            "location": donor.location,

            "availability": donor.availability

        })


    return jsonify(result), 200





# ================= UPDATE AVAILABILITY =================

@auth_bp.route("/availability", methods=["PUT"])
@jwt_required()
def update_availability():

    user_id = get_jwt_identity()


    user = User.query.get(
        int(user_id)
    )


    if not user:

        return jsonify({

            "message": "User not found"

        }), 404



    data = request.get_json()


    user.availability = data.get(

        "availability",

        user.availability

    )


    db.session.commit()



    return jsonify({

        "message": "Availability updated successfully",

        "availability": user.availability

    }), 200


# ================= FORGOT PASSWORD =================

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    email = data.get("email")

    if not email:
        return jsonify({
            "message": "Email is required"
        }), 400

    user = User.query.filter_by(
        email=email.lower().strip()
    ).first()

    # Don't reveal whether the email exists
    if not user:
        return jsonify({
            "message": "If the email exists, a password reset link has been sent."
        }), 200

    # Generate secure token
    token = secrets.token_urlsafe(32)

    user.reset_token = token
    user.reset_token_expiry = datetime.utcnow() + timedelta(hours=1)

    db.session.commit()

    reset_link = f"http://localhost:5173/reset-password/{token}"

    try:
        send_email(
            user.email,
            "LifeLink Password Reset",
            f"""
Hello {user.full_name},

We received a request to reset your password.

Click the link below to reset it:

{reset_link}

This link expires in 1 hour.

If you didn't request this, simply ignore this email.

LifeLink Blood Donation Team
"""
        )
    except Exception as e:
        print(e)

    return jsonify({
        "message": "Password reset email sent successfully."
    }), 200


# ================= RESET PASSWORD =================

@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):

    data = request.get_json()

    password = data.get("password")

    if not password:
        return jsonify({
            "message": "Password is required"
        }), 400

    user = User.query.filter_by(
        reset_token=token
    ).first()

    if not user:
        return jsonify({
            "message": "Invalid or expired token."
        }), 400

    if user.reset_token_expiry < datetime.utcnow():
        return jsonify({
            "message": "Reset token has expired."
        }), 400

    user.password = generate_password_hash(password)

    user.reset_token = None
    user.reset_token_expiry = None

    db.session.commit()

    return jsonify({
        "message": "Password reset successfully."
    }), 200