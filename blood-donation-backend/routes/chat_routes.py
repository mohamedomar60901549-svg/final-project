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
def create_conversation(other_user_id):

    current_user_id = int(get_jwt_identity())

    current_user = User.query.get(current_user_id)
    other_user = User.query.get(other_user_id)

    if not current_user:
        return jsonify({"message": "Current user not found"}), 404

    if not other_user:
        return jsonify({"message": "Other user not found"}), 404

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
    

    other_user_id = int(other_user_id)

    current_user = User.query.get(current_user_id)
    other_user = User.query.get(other_user_id)

    if not current_user or not other_user:
        return jsonify({"message": "User not found"}), 404

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
# GET ALL MESSAGES
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

    ).all()

    data = []

    for convo in conversations:

        other_id = (

            convo.user2_id

            if convo.user1_id == current_user_id

            else convo.user1_id

        )

        other = User.query.get(other_id)

        data.append({

            "conversation_id": convo.id,

            "user_id": other.id,

            "full_name": other.full_name,

            "role": other.role,

            "email": other.email,

            "created_at": convo.created_at.isoformat()

        })

    return jsonify(data)


# =====================================================
# USERS (ADMIN SIDEBAR)
# =====================================================

@chat_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():

    current_user_id = int(get_jwt_identity())

    users = User.query.filter(

        User.id != current_user_id

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