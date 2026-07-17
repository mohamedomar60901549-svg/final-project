from flask_socketio import (
    emit,
    join_room,
    leave_room
)

from datetime import datetime

from extensions import db

from models.message import Message
from models.conversation import Conversation
from models.user import User


# ==========================================================
# ONLINE USERS
# ==========================================================

# Stores IDs of currently connected users
online_users = set()


# ==========================================================
# REGISTER SOCKET EVENTS
# ==========================================================

def register_socket_events(socketio):

        # ======================================================
    # SEND MESSAGE
    # ======================================================

    @socketio.on("send_message")
    def handle_send_message(data):

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        text = data.get("message", "").strip()

        # -----------------------------
        # Validation
        # -----------------------------

        if (
            not conversation_id or
            not sender_id or
            not receiver_id or
            not text
        ):
            return

        # -----------------------------
        # Verify conversation
        # -----------------------------

        conversation = db.session.get(
            Conversation,
            conversation_id
        )

        if not conversation:
            return

        # -----------------------------
        # Save message
        # -----------------------------

        message = Message(
            conversation_id=conversation_id,
            sender_id=sender_id,
            receiver_id=receiver_id,
            message=text,
            is_read=False
        )

        db.session.add(message)

        # -----------------------------
        # Update conversation timestamp
        # -----------------------------

        conversation.updated_at = datetime.utcnow()

        db.session.commit()

        room = f"conversation_{conversation_id}"

        payload = {

            "id": message.id,

            "conversation_id": conversation_id,

            "sender_id": sender_id,

            "receiver_id": receiver_id,

            "message": message.message,

            "is_read": message.is_read,

            "created_at":
                message.created_at.isoformat(),

            "delivered": False

        }

        print("\n==============================")
        print("📨 New Message")
        print("==============================")
        print(f"Conversation : {conversation_id}")
        print(f"Sender       : {sender_id}")
        print(f"Receiver     : {receiver_id}")
        print(f"Message      : {text}")
        print("==============================\n")

        # -----------------------------
        # Send to everyone in room
        # -----------------------------

        emit(
            "receive_message",
            payload,
            room=room
        )

        # -----------------------------
        # Notification
        # -----------------------------

        emit(
            "new_notification",
            {

                "conversation_id": conversation_id,

                "sender_id": sender_id,

                "receiver_id": receiver_id,

                "message": text

            },
            broadcast=True
        )

         # ======================================================
    # USER TYPING
    # ======================================================

    @socketio.on("typing")
    def handle_typing(data):

        conversation_id = data.get("conversation_id")
        user_id = data.get("user_id")
        user_name = data.get("user_name")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        emit(
            "user_typing",
            {
                "user_id": user_id,
                "user_name": user_name
            },
            room=room,
            include_self=False
        )


    # ======================================================
    # MESSAGE DELIVERED
    # ======================================================

    @socketio.on("message_delivered")
    def handle_message_delivered(data):

        message_id = data.get("message_id")

        if not message_id:
            return

        message = db.session.get(Message, message_id)

        if not message:
            return

        room = f"conversation_{message.conversation_id}"

        emit(
            "message_delivered",
            {
                "message_id": message.id
            },
            room=room
        )


    # ======================================================
    # MESSAGE READ
    # ======================================================

    @socketio.on("message_read")
    def handle_message_read(data):

        message_id = data.get("message_id")

        if not message_id:
            return

        message = db.session.get(Message, message_id)

        if not message:
            return

        if not message.is_read:

            message.is_read = True

            db.session.commit()

        room = f"conversation_{message.conversation_id}"

        emit(
            "message_read",
            {
                "message_id": message.id
            },
            room=room
        )


    # ======================================================
    # GET ONLINE USERS
    # ======================================================

    @socketio.on("get_online_users")
    def handle_get_online_users():

        emit(
            "online_users",
            list(online_users)
        )

    # ======================================================
    # CLIENT CONNECT
    # ======================================================

    @socketio.on("connect")
    def handle_connect():

        print("\n==============================")
        print("✅ Client Connected")
        print("==============================\n")


    # ======================================================
    # CLIENT DISCONNECT
    # ======================================================

    @socketio.on("disconnect")
    def handle_disconnect():

        print("\n==============================")
        print("❌ Client Disconnected")
        print("==============================\n")


    # ======================================================
    # USER ONLINE
    # ======================================================

    @socketio.on("user_online")
    def handle_user_online(data):

        user_id = data.get("user_id")

        if not user_id:
            return

        online_users.add(user_id)

        print(f"🟢 User {user_id} is online")

        emit(
            "user_connected",
            {
                "user_id": user_id
            },
            broadcast=True
        )


    # ======================================================
    # USER OFFLINE
    # ======================================================

    @socketio.on("user_offline")
    def handle_user_offline(data):

        user_id = data.get("user_id")

        if not user_id:
            return

        if user_id in online_users:
            online_users.remove(user_id)

        print(f"🔴 User {user_id} is offline")

        emit(
            "user_disconnected",
            {
                "user_id": user_id
            },
            broadcast=True
        )


    # ======================================================
    # SEND ONLINE USERS
    # ======================================================

    @socketio.on("get_online_users")
    def handle_get_online_users():

        emit(
            "online_users",
            list(online_users)
        )


    # ======================================================
    # JOIN CHAT ROOM
    # ======================================================

    @socketio.on("join_room")
    def handle_join_room(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        join_room(room)

        print(f"👥 Joined {room}")

        emit(
            "joined_chat",
            {
                "conversation_id": conversation_id
            }
        )


    # ======================================================
    # LEAVE CHAT ROOM
    # ======================================================

    @socketio.on("leave_room")
    def handle_leave_room(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        leave_room(room)

        print(f"🚪 Left {room}")