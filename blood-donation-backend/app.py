from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt

from routes.auth_routes import auth_bp
from routes.blood_request_routes import blood_request_bp
from routes.donation_routes import donation_bp


app = Flask(__name__)

app.config.from_object(Config)

CORS(app)

db.init_app(app)
jwt.init_app(app)


# Authentication routes
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)


# Blood request routes
app.register_blueprint(
    blood_request_bp,
    url_prefix="/api/blood-requests"
)


# Donation routes
app.register_blueprint(
    donation_bp,
    url_prefix="/api/donations"
)


# Create database tables
with app.app_context():
    db.create_all()


@app.route("/")
def home():
    return {
        "message": "Blood Donation API Running"
    }


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )