from flask_socketio import emit, join_room
from flask_jwt_extended import decode_token
from extensions import db
from models.message import Message


def register_socket_events(socketio):

    # =========================================
    # JOIN USER ROOM
    # =========================================
    @socketio.on("join")
    def join(data):
        token = data["token"]
        user_id = decode_token(token)["sub"]

        join_room(f"user_{user_id}")

        emit("joined", {"user_id": user_id})


    # =========================================
    # SEND MESSAGE
    # =========================================
    @socketio.on("send_message")
    def send_message(data):

        sender_id = decode_token(data["token"])["sub"]

        msg = Message(
            conversation_id=data["conversation_id"],
            sender_id=sender_id,
            receiver_id=data["receiver_id"],
            message=data["message"],
            delivered=True
        )

        db.session.add(msg)
        db.session.commit()

        payload = {
            "id": msg.id,
            "conversation_id": msg.conversation_id,
            "sender_id": sender_id,
            "receiver_id": data["receiver_id"],
            "message": msg.message,
            "is_read": False,
            "delivered": True,
            "created_at": str(msg.created_at)
        }

        # send to receiver
        socketio.emit(
            "receive_message",
            payload,
            room=f"user_{data['receiver_id']}"
        )

        # send to sender
        socketio.emit(
            "message_sent",
            payload,
            room=f"user_{sender_id}"
        )


    # =========================================
    # MARK AS READ
    # =========================================
    @socketio.on("mark_read")
    def mark_read(data):

        msg = Message.query.get(data["message_id"])

        if msg:
            msg.is_read = True
            db.session.commit()

            socketio.emit(
                "message_read",
                {"message_id": msg.id},
                room=f"user_{msg.sender_id}"
            )