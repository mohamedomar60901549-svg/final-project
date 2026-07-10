from datetime import datetime

from flask_socketio import emit, join_room, leave_room

from extensions import db
from models.conversation import Conversation
from models.message import Message


# ==========================================================
# ONLINE USERS
# ==========================================================

online_users = {}


def register_socket_events(socketio):

    # ======================================================
    # CONNECT
    # ======================================================

    @socketio.on("connect")
    def connect():

        print("\n==============================")
        print("✅ Client Connected")
        print("==============================")

    # ======================================================
    # DISCONNECT
    # ======================================================

    @socketio.on("disconnect")
    def disconnect():

        disconnected_user = None

        for user_id, sid in list(online_users.items()):

            if sid == request.sid:
                disconnected_user = user_id
                del online_users[user_id]
                break

        if disconnected_user:

            socketio.emit(
                "user_offline",
                {
                    "user_id": disconnected_user
                },
                broadcast=True
            )

            print(f"🔴 User {disconnected_user} Offline")

        print("\n==============================")
        print("❌ Client Disconnected")
        print("==============================")

    # ======================================================
    # USER ONLINE
    # ======================================================

    @socketio.on("user_online")
    def user_online(data):

        user_id = data.get("user_id")

        if not user_id:
            return

        online_users[user_id] = request.sid

        join_room(f"user_{user_id}")

        socketio.emit(
            "user_online",
            {
                "user_id": user_id
            },
            broadcast=True
        )

        print(f"🟢 User {user_id} Online")

    # ======================================================
    # JOIN CHAT ROOM
    # ======================================================

    @socketio.on("join_room")
    def join_chat(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        join_room(room)

        print(f"✅ Joined {room}")

    # ======================================================
    # LEAVE CHAT ROOM
    # ======================================================

    @socketio.on("leave_room")
    def leave_chat(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            return

        room = f"conversation_{conversation_id}"

        leave_room(room)

        print(f"⬅ Left {room}")

            # ======================================================
    # USER TYPING
    # ======================================================

    @socketio.on("typing")
    def typing(data):

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")

        if not conversation_id or not sender_id:
            return

        socketio.emit(
            "typing",
            {
                "conversation_id": conversation_id,
                "sender_id": sender_id
            },
            room=f"conversation_{conversation_id}",
            include_self=False
        )

    # ======================================================
    # STOP TYPING
    # ======================================================

    @socketio.on("stop_typing")
    def stop_typing(data):

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")

        if not conversation_id or not sender_id:
            return

        socketio.emit(
            "stop_typing",
            {
                "conversation_id": conversation_id,
                "sender_id": sender_id
            },
            room=f"conversation_{conversation_id}",
            include_self=False
        )

    # ======================================================
    # SEND MESSAGE
    # ======================================================

    @socketio.on("send_message")
    def send_message(data):

        print("\n==============================")
        print("📨 NEW MESSAGE")
        print(data)
        print("==============================")

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        message_text = data.get("message", "").strip()

        if not all([
            conversation_id,
            sender_id,
            receiver_id,
            message_text
        ]):
            print("❌ Invalid payload")
            return

        conversation = Conversation.query.get(conversation_id)

        if not conversation:
            print("❌ Conversation not found")
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
            "conversation_id": conversation_id,
            "sender_id": sender_id,
            "receiver_id": receiver_id,
            "message": new_message.message,
            "created_at": new_message.created_at.isoformat(),
            "is_read": False
        }

        # Send instantly to everyone in the conversation
        socketio.emit(
            "receive_message",
            payload,
            room=f"conversation_{conversation_id}"
        )

        # Sender gets delivered tick
        socketio.emit(
            "message_delivered",
            {
                "message_id": new_message.id
            },
            room=f"user_{sender_id}"
        )

        # Receiver gets notification
        socketio.emit(
            "new_notification",
            {
                "conversation_id": conversation_id,
                "sender_id": sender_id,
                "message_id": new_message.id,
                "message": message_text
            },
            room=f"user_{receiver_id}"
        )

        print(f"✅ Message {new_message.id} sent")

            # ======================================================
    # MARK MESSAGES AS READ
    # ======================================================

    @socketio.on("mark_read")
    def mark_read(data):

        conversation_id = data.get("conversation_id")
        reader_id = data.get("user_id")

        if not conversation_id or not reader_id:
            return

        unread_messages = Message.query.filter_by(
            conversation_id=conversation_id,
            receiver_id=reader_id,
            is_read=False
        ).all()

        message_ids = []

        for msg in unread_messages:
            msg.is_read = True
            message_ids.append(msg.id)

        db.session.commit()

        socketio.emit(
            "messages_read",
            {
                "conversation_id": conversation_id,
                "message_ids": message_ids
            },
            room=f"conversation_{conversation_id}"
        )

        print(f"👀 {len(message_ids)} messages marked as read")

    # ======================================================
    # GET ONLINE USERS
    # ======================================================

    @socketio.on("get_online_users")
    def get_online_users():

        socketio.emit(
            "online_users",
            {
                "users": list(online_users.keys())
            }
        )

    # ======================================================
    # GET UNREAD COUNT
    # ======================================================

    @socketio.on("get_unread_count")
    def get_unread_count(data):

        user_id = data.get("user_id")

        if not user_id:
            return

        unread = Message.query.filter_by(
            receiver_id=user_id,
            is_read=False
        ).count()

        socketio.emit(
            "unread_count",
            {
                "count": unread
            },
            room=f"user_{user_id}"
        )

    # ======================================================
    # PING
    # ======================================================

    @socketio.on("ping_server")
    def ping_server():

        emit(
            "pong_server",
            {
                "status": "ok"
            }
        )

    # ======================================================
    # USER IS VIEWING CONVERSATION
    # ======================================================

    @socketio.on("conversation_opened")
    def conversation_opened(data):

        conversation_id = data.get("conversation_id")
        user_id = data.get("user_id")

        if not conversation_id or not user_id:
            return

        unread_messages = Message.query.filter_by(
            conversation_id=conversation_id,
            receiver_id=user_id,
            is_read=False
        ).all()

        if unread_messages:

            ids = []

            for msg in unread_messages:
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

    print("✅ Socket Events Registered")