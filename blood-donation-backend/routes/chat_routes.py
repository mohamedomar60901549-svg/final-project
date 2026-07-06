from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.conversation import Conversation
from models.message import Message

chat_bp = Blueprint("chat", __name__)


# =========================================
# GET OR CREATE CONVERSATION
# =========================================
@chat_bp.route("/conversation/<int:user_id>", methods=["POST"])
@jwt_required()
def create_or_get_conversation(user_id):
    current_user = get_jwt_identity()

    convo = Conversation.query.filter_by(user_id=user_id).first()

    if not convo:
        convo = Conversation(user_id=user_id)
        db.session.add(convo)
        db.session.commit()

    return jsonify({
        "conversation_id": convo.id
    })


# =========================================
# GET MESSAGES
# =========================================
@chat_bp.route("/messages/<int:conversation_id>", methods=["GET"])
@jwt_required()
def get_messages(conversation_id):

    msgs = Message.query.filter_by(conversation_id=conversation_id).all()

    return jsonify([
        {
            "id": m.id,
            "sender_id": m.sender_id,
            "receiver_id": m.receiver_id,
            "message": m.message,
            "is_read": m.is_read,
            "delivered": m.delivered,
            "created_at": str(m.created_at)
        }
        for m in msgs
    ])