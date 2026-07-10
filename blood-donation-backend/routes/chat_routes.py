from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from extensions import db

from models.user import User
from models.conversation import Conversation
from models.message import Message


chat_bp = Blueprint(
    "chat",
    __name__
)



# ======================================================
# CREATE OR GET CONVERSATION
# ======================================================

@chat_bp.route(
    "/conversation/<int:other_user_id>",
    methods=["POST"]
)
@jwt_required()
def create_conversation(other_user_id):


    current_user_id = int(
        get_jwt_identity()
    )


    other_user = User.query.get(
        other_user_id
    )


    if not other_user:

        return jsonify({
            "message":"User not found"
        }),404



    conversation = Conversation.query.filter(

        (
            (Conversation.user1_id == current_user_id)
            &
            (Conversation.user2_id == other_user_id)
        )

        |

        (
            (Conversation.user1_id == other_user_id)
            &
            (Conversation.user2_id == current_user_id)
        )

    ).first()



    if not conversation:


        conversation = Conversation(

            user1_id=current_user_id,

            user2_id=other_user_id

        )


        db.session.add(
            conversation
        )

        db.session.commit()



    return jsonify({

        "conversation_id":
        conversation.id

    })






# ======================================================
# GET MESSAGES
# ======================================================

@chat_bp.route(
    "/messages/<int:conversation_id>",
    methods=["GET"]
)
@jwt_required()
def get_messages(conversation_id):


    current_user_id = int(
        get_jwt_identity()
    )



    conversation = Conversation.query.get(
        conversation_id
    )


    if not conversation:

        return jsonify({
            "message":"Conversation not found"
        }),404




    # SECURITY CHECK

    if current_user_id not in [

        conversation.user1_id,

        conversation.user2_id

    ]:

        return jsonify({
            "message":"Unauthorized"
        }),403




    messages = Message.query.filter_by(

        conversation_id=conversation_id

    ).order_by(

        Message.created_at.asc()

    ).all()



    return jsonify([


        {

            "id":m.id,

            "sender_id":m.sender_id,

            "receiver_id":m.receiver_id,

            "message":m.message,

            "is_read":m.is_read,

            "created_at":
            m.created_at.isoformat()

        }


        for m in messages


    ])







# ======================================================
# MARK MESSAGES READ
# ======================================================

@chat_bp.route(
    "/read/<int:conversation_id>",
    methods=["PUT"]
)
@jwt_required()
def mark_read(conversation_id):


    current_user_id = int(
        get_jwt_identity()
    )



    messages = Message.query.filter_by(

        conversation_id=conversation_id,

        receiver_id=current_user_id,

        is_read=False

    ).all()



    for msg in messages:

        msg.is_read = True



    db.session.commit()



    return jsonify({

        "message":"Messages marked read"

    })








# ======================================================
# MY CONVERSATIONS
# ======================================================

@chat_bp.route(
    "/my-conversations",
    methods=["GET"]
)
@jwt_required()
def my_conversations():


    current_user_id = int(
        get_jwt_identity()
    )



    conversations = Conversation.query.filter(

        (
            Conversation.user1_id == current_user_id
        )

        |

        (
            Conversation.user2_id == current_user_id
        )

    ).order_by(

        Conversation.updated_at.desc()

    ).all()



    result=[]



    for chat in conversations:


        other_id = (

            chat.user2_id

            if chat.user1_id == current_user_id

            else chat.user1_id

        )


        other = User.query.get(
            other_id
        )


        last = Message.query.filter_by(

            conversation_id=chat.id

        ).order_by(

            Message.created_at.desc()

        ).first()



        unread = Message.query.filter_by(

            conversation_id=chat.id,

            receiver_id=current_user_id,

            is_read=False

        ).count()



        result.append({

            "conversation_id":
            chat.id,


            "user_id":
            other.id,


            "full_name":
            other.full_name,


            "role":
            other.role,


            "last_message":
            last.message
            if last else "",


            "unread":
            unread

        })



    return jsonify(result)








# ======================================================
# USERS FOR CHAT SIDEBAR
# ======================================================

@chat_bp.route(
    "/users",
    methods=["GET"]
)
@jwt_required()
def chat_users():


    current_user_id = int(
        get_jwt_identity()
    )


    current_user = User.query.get(
        current_user_id
    )


    if not current_user:

        return jsonify([])



    if current_user.role == "admin":


        users = User.query.filter(

            User.id != current_user_id

        ).order_by(

            User.full_name.asc()

        ).all()



    else:


        users = User.query.filter_by(

            role="admin"

        ).all()




    return jsonify([


        {

            "id":user.id,

            "full_name":
            user.full_name,

            "email":
            user.email,

            "role":
            user.role

        }


        for user in users


    ])