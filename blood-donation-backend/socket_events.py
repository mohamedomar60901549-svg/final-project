from flask import request
from flask_socketio import emit, join_room, leave_room

from extensions import db
from models.message import Message
from models.conversation import Conversation

online_users = {}


def register_socket_events(socketio):

    # =====================================
    # CONNECT
    # =====================================

    @socketio.on("connect")
    def connect():
        print(f"✅ Socket Connected: {request.sid}")

    # =====================================
    # DISCONNECT
    # =====================================

    @socketio.on("disconnect")
    def disconnect():

        disconnected_user = None

        for user_id, sid in list(online_users.items()):

            if sid == request.sid:
                disconnected_user = user_id
                del online_users[user_id]
                break

        if disconnected_user:

            emit(
                "user_disconnected",
                {
                    "user_id": disconnected_user
                },
                broadcast=True
            )

        print(f"❌ Socket Disconnected: {request.sid}")

    # =====================================
    # USER ONLINE
    # =====================================

    @socketio.on("user_online")
    def user_online(data):

        user_id = data["user_id"]

        online_users[user_id] = request.sid

        emit(
            "online_users",
            list(online_users.keys())
        )

        emit(
            "user_connected",
            {
                "user_id": user_id
            },
            broadcast=True
        )

    # =====================================
    # GET ONLINE USERS
    # =====================================

    @socketio.on("get_online_users")
    def get_online_users():

        emit(
            "online_users",
            list(online_users.keys())
        )

    # =====================================
    # JOIN ROOM
    # =====================================

    @socketio.on("join_room")
    def join_chat(data):

        room = f"chat_{data['conversation_id']}"

        join_room(room)

        print(f"Joined {room}")

    # =====================================
    # LEAVE ROOM
    # =====================================

    @socketio.on("leave_room")
    def leave_chat(data):

        room = f"chat_{data['conversation_id']}"

        leave_room(room)

        print(f"Left {room}")

    # =====================================
    # SEND MESSAGE
    # =====================================

    @socketio.on("send_message")
    def send_message(data):

        message = Message(

            conversation_id=data["conversation_id"],

            sender_id=data["sender_id"],

            receiver_id=data["receiver_id"],

            message=data["message"],

            is_read=False

        )

        db.session.add(message)

        conversation = Conversation.query.get(
            data["conversation_id"]
        )

        if conversation:
            conversation.updated_at = message.created_at

        db.session.commit()

        room = f"chat_{message.conversation_id}"

        message_data = {

            "id": message.id,

            "conversation_id": message.conversation_id,

            "sender_id": message.sender_id,

            "receiver_id": message.receiver_id,

            "message": message.message,

            "created_at": message.created_at.isoformat(),

            "is_read": message.is_read,

            "delivered": True

        }

        emit(
            "receive_message",
            message_data,
            room=room
        )

        if message.receiver_id in online_users:

            emit(

                "new_notification",

                {

                    "sender_id": message.sender_id,

                    "conversation_id": message.conversation_id,

                    "message": message.message

                },

                room=online_users[message.receiver_id]

            )

    # =====================================
    # USER TYPING
    # =====================================

    @socketio.on("typing")
    def typing(data):

        room = f"chat_{data['conversation_id']}"

        emit(
            "user_typing",
            data,
            room=room,
            include_self=False
        )

    # =====================================
    # MESSAGE DELIVERED
    # =====================================

    @socketio.on("message_delivered")
    def message_delivered(data):

        emit(
            "message_delivered",
            data,
            broadcast=True,
            include_self=False
        )

    # =====================================
    # MESSAGE READ
    # =====================================

    @socketio.on("message_read")
    def message_read(data):

        message = Message.query.get(data["message_id"])

        if message:

            message.is_read = True

            db.session.commit()

        emit(
            "message_read",
            data,
            broadcast=True,
            include_self=False
        )