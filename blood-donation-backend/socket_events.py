from flask_socketio import emit, join_room

def register_socket_events(socketio):

    @socketio.on("connect")
    def connect():
        print("Client connected")
        emit("connected", {"message": "connected"})

    # 👇 join a specific conversation room
    @socketio.on("join_room")
    def handle_join(data):
        room = data["conversation_id"]
        join_room(room)
        print(f"Joined room: {room}")

    # 💬 send message ONLY to that room
    @socketio.on("send_message")
    def handle_message(data):

        room = data["conversation_id"]

        message_data = {
            "conversation_id": room,
            "sender_id": data["sender_id"],
            "message": data["message"]
        }

        emit(
            "receive_message",
            message_data,
            room=room
        )