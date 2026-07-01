from functools import wraps

from flask import jsonify

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt_identity
)

from models.user import User



def role_required(required_role):

    def decorator(fn):

        @wraps(fn)
        def wrapper(*args, **kwargs):

            verify_jwt_in_request()

            user_id = get_jwt_identity()

            user = User.query.get(int(user_id))


            if not user:
                return jsonify({
                    "message": "User not found"
                }), 404


            if user.role != required_role:
                return jsonify({
                    "message": f"{required_role.capitalize()} access required"
                }), 403


            return fn(*args, **kwargs)


        return wrapper

    return decorator




def admin_required(fn):

    return role_required("admin")(fn)




def donor_required(fn):

    return role_required("donor")(fn)




def patient_required(fn):

    return role_required("patient")(fn)