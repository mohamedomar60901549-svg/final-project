from flask_socketio import (
    emit,
    join_room,
    leave_room
)

from datetime import datetime

from extensions import db

from models.message import Message
from models.conversation import Conversation


# ==========================================================
# ONLINE USERS
# ==========================================================

online_users = set()



# ==========================================================
# REGISTER SOCKET EVENTS
# ==========================================================

def register_socket_events(socketio):


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
    def user_online(data):

        user_id = data.get("user_id")

        if user_id:

            online_users.add(user_id)

            print(
                f"🟢 User online: {user_id}"
            )


            emit(
                "user_status",
                {
                    "user_id": user_id,
                    "status": "online"
                },
                broadcast=True
            )



    # ======================================================
    # USER OFFLINE
    # ======================================================

    @socketio.on("user_offline")
    def user_offline(data):

        user_id = data.get("user_id")

        if user_id in online_users:

            online_users.remove(user_id)


            print(
                f"🔴 User offline: {user_id}"
            )


            emit(
                "user_status",
                {
                    "user_id": user_id,
                    "status": "offline"
                },
                broadcast=True
            )



    # ======================================================
    # JOIN CONVERSATION ROOM
    # ======================================================

    @socketio.on("join_chat")
    def join_chat(data):

        conversation_id = data.get(
            "conversation_id"
        )


        if conversation_id:

            room = (
                f"conversation_{conversation_id}"
            )


            join_room(room)


            print(
                f"👥 Joined room: {room}"
            )


            emit(
                "joined_chat",
                {
                    "conversation_id":
                    conversation_id
                }
            )
