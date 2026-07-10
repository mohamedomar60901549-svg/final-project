from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db
from models.user import User
from models.conversation import Conversation
from models.message import Message

chat_bp = Blueprint("chat", __name__)


# =====================================================
# CREATE OR GET CONVERSATION
# =====================================================

@chat_bp.route("/conversation/<int:other_user_id>", methods=["POST"])
@jwt_required()
def create_conversation():

    current_user_id = int(get_jwt_identity())

    other_user = User.query.get(other_user_id)

    if not other_user:
        return jsonify({
            "message": "User not found"
        }), 404

    conversation = Conversation.query.filter(

        (
            (Conversation.user1_id == current_user_id) &
            (Conversation.user2_id == other_user_id)
        )

        |

        (
            (Conversation.user1_id == other_user_id) &
            (Conversation.user2_id == current_user_id)
        )

    ).first()

    if not conversation:

        conversation = Conversation(
            user1_id=current_user_id,
            user2_id=other_user_id
        )

        db.session.add(conversation)
        db.session.commit()

    return jsonify({

        "conversation_id": conversation.id

    })


# =====================================================
# GET MESSAGES
# =====================================================

@chat_bp.route("/messages/<int:conversation_id>", methods=["GET"])
@jwt_required()
def get_messages(conversation_id):

    messages = Message.query.filter_by(
        conversation_id=conversation_id
    ).order_by(
        Message.created_at.asc()
    ).all()

    return jsonify([

        {

            "id": m.id,

            "conversation_id": m.conversation_id,

            "sender_id": m.sender_id,

            "receiver_id": m.receiver_id,

            "message": m.message,

            "is_read": m.is_read,

            "created_at": m.created_at.isoformat()

        }

        for m in messages

    ])


# =====================================================
# MY CONVERSATIONS
# =====================================================

@chat_bp.route("/my-conversations", methods=["GET"])
@jwt_required()
def my_conversations():

    current_user_id = int(get_jwt_identity())

    conversations = Conversation.query.filter(

        (Conversation.user1_id == current_user_id)

        |

        (Conversation.user2_id == current_user_id)

    ).order_by(

        Conversation.updated_at.desc()

    ).all()

    result = []

    for conversation in conversations:

        if conversation.user1_id == current_user_id:
            other = User.query.get(conversation.user2_id)
        else:
            other = User.query.get(conversation.user1_id)

        last_message = Message.query.filter_by(
            conversation_id=conversation.id
        ).order_by(
            Message.created_at.desc()
        ).first()

        unread = Message.query.filter_by(
            conversation_id=conversation.id,
            receiver_id=current_user_id,
            is_read=False
        ).count()

        result.append({

            "conversation_id": conversation.id,

            "user_id": other.id,

            "full_name": other.full_name,

            "email": other.email,

            "role": other.role,

            "last_message":
                last_message.message if last_message else "",

            "last_time":
                last_message.created_at.isoformat()
                if last_message else None,

            "unread": unread

        })

    return jsonify(result)


# =====================================================
# USERS FOR SIDEBAR
# =====================================================

@chat_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():

    current_user = User.query.get(
        int(get_jwt_identity())
    )

    if not current_user:
        return jsonify([])

    # -----------------------------
    # ADMIN
    # -----------------------------

    if current_user.role == "admin":

        users = User.query.filter(
            User.id != current_user.id
        ).order_by(
            User.full_name
        ).all()

    # -----------------------------
    # DONOR / PATIENT
    # -----------------------------

    else:

        users = User.query.filter_by(
            role="admin"
        ).order_by(
            User.full_name
        ).all()

    return jsonify([

        {

            "id": u.id,

            "full_name": u.full_name,

            "email": u.email,

            "role": u.role

        }

        for u in users

    ])