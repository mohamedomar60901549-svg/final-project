from flask_socketio import emit, join_room, leave_room
from datetime import datetime

from extensions import db
from models.message import Message
from models.conversation import Conversation

# Store online users
online_users = set()


def register_socket_events(socketio):

    # ==========================================================
    # CONNECT
    # ==========================================================

    @socketio.on("connect")
    def connect():

        print("\n==============================")
        print("✅ Client Connected")
        print("==============================\n")

    # ==========================================================
    # USER ONLINE
    # ==========================================================

    @socketio.on("user_online")
    def user_online(data):

        user_id = data.get("user_id")

        if not user_id:
            return

        room = f"user_{user_id}"

        join_room(room)

        online_users.add(user_id)

        socketio.emit(
            "user_online",
            {
                "user_id": user_id
            }
        )

        print(f"🟢 User {user_id} Online")

    # ==========================================================
    # DISCONNECT
    # ==========================================================

    @socketio.on("disconnect")
    def disconnect():

        print("\n==============================")
        print("❌ Client Disconnected")
        print("==============================\n")

    # ==========================================================
    # JOIN CHAT ROOM
    # ==========================================================

    @socketio.on("join_room")
    def join(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        join_room(room)

        print(f"✅ Joined Room -> {room}")

    # ==========================================================
    # LEAVE CHAT ROOM
    # ==========================================================

    @socketio.on("leave_room")
    def leave(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        leave_room(room)

        print(f"⬅ Left Room -> {room}")

    # ==========================================================
    # TYPING...
    # ==========================================================

    @socketio.on("typing")
    def typing(data):

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")

        socketio.emit(

            "typing",

            {

                "sender_id": sender_id

            },

            room=f"conversation_{conversation_id}",

            include_self=False

        )

    # ==========================================================
    # STOP TYPING
    # ==========================================================

    @socketio.on("stop_typing")
    def stop_typing(data):

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")

        socketio.emit(

            "stop_typing",

            {

                "sender_id": sender_id

            },

            room=f"conversation_{conversation_id}",

            include_self=False

        )

    # ==========================================================
    # SEND MESSAGE
    # ==========================================================

    @socketio.on("send_message")
    def send_message(data):

        print("\n======================================")
        print("📨 NEW MESSAGE")
        print(data)

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        message_text = data.get("message")

        if not all([conversation_id, sender_id, receiver_id, message_text]):
            print("❌ Invalid Payload")
            return

        conversation = Conversation.query.get(conversation_id)

        if not conversation:
            print("❌ Conversation Not Found")
            return

        new_message = Message(

            conversation_id=conversation_id,

            sender_id=sender_id,

            receiver_id=receiver_id,

            message=message_text,

            is_read=False

        )

        db.session.add(new_message)

        conversation.updated_at = datetime.utcnow()

        db.session.commit()

        payload = {

            "id": new_message.id,

            "conversation_id": new_message.conversation_id,

            "sender_id": new_message.sender_id,

            "receiver_id": new_message.receiver_id,

            "message": new_message.message,

            "created_at": new_message.created_at.isoformat(),

            "is_read": False

        }

        room = f"conversation_{conversation_id}"

        socketio.emit(

            "receive_message",

            payload,

            room=room

        )

        # Delivered notification
        socketio.emit(

            "message_delivered",

            {

                "message_id": new_message.id

            },

            room=f"user_{sender_id}"

        )

        print(f"✅ Message {new_message.id} Delivered")

    # ==========================================================
    # MARK AS READ
    # ==========================================================

    @socketio.on("mark_read")
    def mark_read(data):

        conversation_id = data.get("conversation_id")
        reader_id = data.get("user_id")

        if not conversation_id:
            return

        unread = Message.query.filter_by(

            conversation_id=conversation_id,

            receiver_id=reader_id,

            is_read=False

        ).all()

        ids = []

        for msg in unread:

            msg.is_read = True

            ids.append(msg.id)

        db.session.commit()

        socketio.emit(

            "messages_read",

            {

                "conversation_id": conversation_id,

                "message_ids": ids

            },

            room=f"conversation_{conversation_id}"

        )

        print(f"👀 {len(ids)} messages marked as read")