from functools import wraps

from flask import jsonify
from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt_identity
)

from models.user import User


def admin_required(fn):

    @wraps(fn)
    def wrapper(*args, **kwargs):

        verify_jwt_in_request()

        user_id = get_jwt_identity()

        user = User.query.get(int(user_id))

        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        if user.role != "admin":
            return jsonify({
                "message": "Admin access required"
            }), 403

        return fn(*args, **kwargs)

    return wrapper