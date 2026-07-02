from routes.auth.auth_register import auth_register_bp
from routes.auth.auth_login import auth_login_bp
from routes.auth.auth_profile import auth_profile_bp
from routes.auth.auth_password import auth_password_bp
from routes.auth.auth_admin import auth_admin_bp


def register_auth_routes(app):

    app.register_blueprint(auth_register_bp, url_prefix="/api/auth")
    app.register_blueprint(auth_login_bp, url_prefix="/api/auth")
    app.register_blueprint(auth_profile_bp, url_prefix="/api/auth")
    app.register_blueprint(auth_password_bp, url_prefix="/api/auth")
    app.register_blueprint(auth_admin_bp, url_prefix="/api/auth")