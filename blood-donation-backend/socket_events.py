from flask_socketio import (
    emit,
    join_room,
    leave_room
)

from extensions import db

from models.message import Message
from models.conversation import Conversation


online_users = {}



def register_socket_events(socketio):


    # ===============================
    # CONNECT
    # ===============================

    @socketio.on("connect")
    def connect():

        print("✅ Socket Connected")




    # ===============================
    # DISCONNECT
    # ===============================

    @socketio.on("disconnect")
    def disconnect():

        print("❌ Socket Disconnected")



    # ===============================
    # USER ONLINE
    # ===============================

    @socketio.on("user_online")
    def user_online(data):


        user_id = data["user_id"]


        online_users[user_id] = request.sid


        emit(
            "user_connected",
            {
                "user_id":user_id
            },
            broadcast=True
        )


        emit(
            "online_users",
            list(online_users.keys())
        )




    # ===============================
    # GET ONLINE USERS
    # ===============================

    @socketio.on("get_online_users")
    def get_online_users():


        emit(
            "online_users",
            list(online_users.keys())
        )





    # ===============================
    # JOIN CHAT ROOM
    # ===============================

    @socketio.on("join_room")
    def join_chat(data):


        room = f"chat_{data['conversation_id']}"


        join_room(room)





    # ===============================
    # LEAVE ROOM
    # ===============================

    @socketio.on("leave_room")
    def leave_chat(data):


        room = f"chat_{data['conversation_id']}"


        leave_room(room)





    # ===============================
    # SEND MESSAGE
    # ===============================

    @socketio.on("send_message")
    def send_message(data):


        message = Message(

            conversation_id=data["conversation_id"],

            sender_id=data["sender_id"],

            receiver_id=data["receiver_id"],

            message=data["message"]

        )


        db.session.add(message)


        conversation = Conversation.query.get(
            data["conversation_id"]
        )


        db.session.commit()



        conversation.updated_at = message.created_at

        db.session.commit()



        room = f"chat_{data['conversation_id']}"



        emit(

            "receive_message",

            {

                "id":message.id,

                "conversation_id":
                message.conversation_id,

                "sender_id":
                message.sender_id,

                "receiver_id":
                message.receiver_id,

                "message":
                message.message,

                "created_at":
                message.created_at.isoformat(),

                "is_read":False

            },

            room=room

        )



        # send notification globally

        if data["receiver_id"] in online_users:


            emit(

                "new_notification",

                {

                    "sender_id":
                    data["sender_id"],

                    "message":
                    data["message"]

                },

                room=online_users[data["receiver_id"]]

            )





    # ===============================
    # TYPING
    # ===============================

    @socketio.on("typing")
    def typing(data):


        room = f"chat_{data['conversation_id']}"


        emit(

            "user_typing",

            data,

            room=room

        )