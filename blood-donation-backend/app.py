from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, mail, socketio

# ==================================================
# IMPORT MODELS
# ==================================================

from models.user import User
from models.conversation import Conversation
from models.message import Message
from models.donation_response import DonationResponse

# ==================================================
# IMPORT ROUTES
# ==================================================

from routes.auth_routes import register_auth_routes
from routes.blood_request_routes import blood_request_bp
from routes.donation_routes import donation_bp
from routes.donation_response_routes import donation_response_bp
from routes.chat_routes import chat_bp

# ==================================================
# SOCKET EVENTS
# ==================================================

from socket_events import register_socket_events


# ==================================================
# CREATE APP
# ==================================================

app = Flask(__name__)
app.config.from_object(Config)

# ==================================================
# CORS
# ==================================================

CORS(
    app,
    supports_credentials=True
)

# ==================================================
# INITIALIZE EXTENSIONS
# ==================================================

db.init_app(app)
jwt.init_app(app)
mail.init_app(app)

socketio.init_app(
    app,
    cors_allowed_origins="*",
    async_mode="threading"
)

# ==================================================
# REGISTER SOCKET EVENTS
# ==================================================

register_socket_events(socketio)

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

app.register_blueprint(
    donation_response_bp,
    url_prefix="/api/responses"
)

app.register_blueprint(
    chat_bp,
    url_prefix="/api/chat"
)

# ==================================================
# CREATE DATABASE TABLES
# ==================================================

with app.app_context():

    db.create_all()

    print("\n======================================")
    print("🩸 LifeLink Backend Started Successfully")
    print("Database:", db.engine.url)
    print("======================================\n")

# ==================================================
# HOME ROUTE
# ==================================================

@app.route("/")
def home():

    return {
        "message": "🩸 LifeLink API Running Successfully"
    }


# ==================================================
# RUN SERVER
# ==================================================

if __name__ == "__main__":

    socketio.run(
        app,
        host="127.0.0.1",
        port=5000,
        debug=True
    )