from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, mail

from routes.auth_routes import auth_bp
from routes.blood_request_routes import blood_request_bp
from routes.donation_routes import donation_bp


app = Flask(__name__)

app.config.from_object(Config)


# ==========================
# Extensions
# ==========================

CORS(app)

db.init_app(app)
jwt.init_app(app)
mail.init_app(app)


# ==========================
# Routes
# ==========================

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


# ==========================
# Database
# ==========================

with app.app_context():
    db.create_all()


# ==========================
# Test Routes
# ==========================

@app.route("/")
def home():
    return {
        "message": "Blood Donation API Running"
    }


@app.route("/api/test-email")
def test_email():

    from flask_mail import Message

    msg = Message(
        subject="LifeLink Test Email",
        sender="lifelink.bloodsystem@gmail.com",
        recipients=[
            "lifelink.bloodsystem@gmail.com"
        ]
    )

    msg.body = """
Hello from LifeLink Blood Donation System.

Email service is working successfully.
"""

    mail.send(msg)

    return {
        "message": "Test email sent successfully"
    }


# ==========================
# Run Application
# ==========================

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )