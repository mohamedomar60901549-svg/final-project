from flask_socketio import emit, join_room, leave_room
from datetime import datetime

from extensions import db
from models.message import Message
from models.conversation import Conversation


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
    # DISCONNECT
    # ==========================================================

    @socketio.on("disconnect")
    def disconnect():
        print("\n==============================")
        print("❌ Client Disconnected")
        print("==============================\n")

    # ==========================================================
    # JOIN CONVERSATION ROOM
    # ==========================================================

    @socketio.on("join_room")
    def join(data):

        conversation_id = data.get("conversation_id")

        if not conversation_id:
            print("❌ conversation_id missing")
            return

        room = f"conversation_{conversation_id}"

        join_room(room)

        print(f"✅ Joined Room -> {room}")

    # ==========================================================
    # LEAVE ROOM
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
    # SEND MESSAGE
    # ==========================================================

    @socketio.on("send_message")
    def send_message(data):

        print("\n======================================")
        print("📨 NEW MESSAGE RECEIVED")
        print("======================================")
        print(data)

        conversation_id = data.get("conversation_id")
        sender_id = data.get("sender_id")
        receiver_id = data.get("receiver_id")
        message_text = data.get("message")

        if (
            conversation_id is None
            or sender_id is None
            or receiver_id is None
            or not message_text
        ):
            print("❌ Invalid payload")
            return

        conversation = Conversation.query.get(conversation_id)

        if not conversation:
            print("❌ Conversation not found")
            return

        # Save message

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

            "is_read": new_message.is_read,

            "created_at": new_message.created_at.isoformat()

        }

        room = f"conversation_{conversation_id}"

        print("\n========== MESSAGE SAVED ==========")
        print("ID:", new_message.id)
        print("Conversation:", conversation_id)
        print("Sender:", sender_id)
        print("Receiver:", receiver_id)
        print("Room:", room)
        print("Message:", message_text)

        # Broadcast to EVERYONE in this conversation

        socketio.emit(

            "receive_message",

            payload,

            room=room

        )

        print("✅ Message Broadcast Successfully")
        print("======================================\n")