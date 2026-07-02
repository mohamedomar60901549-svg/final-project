from flask import Blueprint, jsonify, request
from models.user import User
from extensions import db
from utils.auth import admin_required

auth_admin_bp = Blueprint("auth_admin", __name__)

# GET USERS
@auth_admin_bp.route("/users", methods=["GET"])
@admin_required
def get_users():

    users = User.query.order_by(User.id.desc()).all()
    return jsonify([u.to_dict() for u in users]), 200


# DELETE USER
@auth_admin_bp.route("/users/<int:id>", methods=["DELETE"])
@admin_required
def delete_user(id):

    user = User.query.get(id)

    if not user:
        return jsonify({"message": "not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "deleted"}), 200