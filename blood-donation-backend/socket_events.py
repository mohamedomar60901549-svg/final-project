from flask_socketio import emit, join_room, leave_room
from flask import request

from datetime import datetime

from extensions import db

from models.message import Message
from models.conversation import Conversation


# Store connected users
online_users = {}



def register_socket_events(socketio):


    # =====================================
    # CONNECT
    # =====================================

    @socketio.on("connect")
    def connect():

        print("\n==============================")
        print("✅ Client Connected")
        print(request.sid)
        print("==============================\n")




    # =====================================
    # USER ONLINE
    # =====================================

    @socketio.on("user_online")
    def user_online(data):

        user_id = data.get("user_id")


        if user_id:

            online_users[user_id] = request.sid


            print(
                f"🟢 User {user_id} online"
            )


            emit(
                "online_users",
                list(online_users.keys()),
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

    def join_chat_room(data):

        conversation_id = data.get(
            "conversation_id"
        )


        if conversation_id:

            room = (
                f"conversation_{conversation_id}"
            )


            join_room(room)


            print(
                f"Joined {room}"
            )






    # =====================================
    # LEAVE ROOM
    # =====================================

    @socketio.on("leave_room")

    def leave_chat_room(data):

        conversation_id = data.get(
            "conversation_id"
        )


        if conversation_id:

            leave_room(
                f"conversation_{conversation_id}"
            )






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

            created_at=datetime.utcnow()

        )


        db.session.add(message)

        db.session.commit()



        room = (
            f"conversation_{data['conversation_id']}"
        )



        emit(

            "receive_message",

            {

                "id": message.id,

                "conversation_id":
                    message.conversation_id,

                "sender_id":
                    message.sender_id,

                "receiver_id":
                    message.receiver_id,

                "message":
                    message.message,

                "created_at":
                    message.created_at.isoformat()

            },

            room=room

        )







    # =====================================
    # TYPING
    # =====================================

    @socketio.on("typing")

    def typing(data):

        emit(

            "user_typing",

            data,

            broadcast=True

        )







    # =====================================
    # DISCONNECT
    # =====================================

    @socketio.on("disconnect")

    def disconnect():


        disconnected_user = None



        for user_id, sid in list(
            online_users.items()
        ):


            if sid == request.sid:

                disconnected_user = user_id

                del online_users[user_id]

                break




        if disconnected_user:


            print(
                f"🔴 User {disconnected_user} offline"
            )


            emit(

                "user_disconnected",

                {

                    "user_id":
                    disconnected_user

                },

                broadcast=True

            )



            emit(

                "online_users",

                list(online_users.keys()),

                broadcast=True

            )



        print(
            "Client disconnected"
        )