from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, mail

from routes.auth_routes import register_auth_routes
from routes.blood_request_routes import blood_request_bp
from routes.donation_routes import donation_bp


app = Flask(__name__)
app.config.from_object(Config)

# ==================================================
# EXTENSIONS
# ==================================================

CORS(app)

db.init_app(app)
jwt.init_app(app)
mail.init_app(app)

# ==================================================
# REGISTER BLUEPRINTS
# ==================================================

register_auth_routes(app)

app.register_blueprint(
    blood_request_bp,
    url_prefix="/api/blood-requests"
)

app.register_blueprint(
    donation_bp,
    url_prefix="/api/donations"
)

# ==================================================
# DATABASE
# ==================================================

with app.app_context():

    db.create_all()

    print("\n======================================")
    print("🩸 LifeLink Backend Started")
    print("Database:", db.engine.url)
    print("======================================\n")

# ==================================================
# HOME ROUTE
# ==================================================

@app.route("/")
def home():
    return {
        "message": "🩸 LifeLink Blood Donation API is Running Successfully"
    }

# ==================================================
# RUN APPLICATION
# ==================================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )