from flask import Blueprint, request, jsonify

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


    existing_user = User.query.filter_by(
        email=data["email"]
    ).first()


    if existing_user:

        return jsonify({
            "message": "Email already exists"
        }), 409



    user = User(

        full_name=data["full_name"],

        email=data["email"],

        password=generate_password_hash(
            data["password"]
        ),

        role=data.get(
            "role",
            "donor"
        ),

        blood_group=data.get(
            "blood_group"
        ),

        location=data.get(
            "location"
        ),

        availability=data.get(
            "availability",
            "available"
        )

    )


    db.session.add(user)

    db.session.commit()



    return jsonify({

        "message": "User registered successfully"

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