from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, jwt, mail, socketio

# ==================================================
# CREATE APP
# ==================================================

app = Flask(__name__)
app.config.from_object(Config)

# ==================================================
# CORS
# ==================================================

CORS(app, supports_credentials=True)

# ==================================================
# INIT EXTENSIONS
# ==================================================

db.init_app(app)
jwt.init_app(app)
mail.init_app(app)

socketio.init_app(
    app,
    cors_allowed_origins="*",
    async_mode="threading"   # ✅ IMPORTANT FIX (avoids eventlet issues)
)

# ==================================================
# IMPORT MODELS (ENSURE TABLE CREATION)
# ==================================================

from models.user import User
from models.conversation import Conversation
from models.message import Message

# ==================================================
# IMPORT ROUTES & SOCKETS
# ==================================================

from routes.auth_routes import register_auth_routes
from routes.blood_request_routes import blood_request_bp
from routes.donation_routes import donation_bp
from routes.chat_routes import chat_bp
from socket_events import register_socket_events

# ==================================================
# SOCKET EVENTS
# ==================================================

register_socket_events(socketio)

# ==================================================
# BLUEPRINTS
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
    chat_bp,
    url_prefix="/api/chat"
)

# ==================================================
# DATABASE INIT
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