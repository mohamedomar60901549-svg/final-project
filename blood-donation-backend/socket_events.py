from flask_socketio import (
    emit,
    join_room,
    leave_room
)

from datetime import datetime

from extensions import db

from models.message import Message
from models.conversation import Conversation



# =====================================================
# ONLINE USERS
# =====================================================

online_users = set()



def register_socket_events(socketio):


    # =================================================
    # CONNECT
    # =================================================

    @socketio.on("connect")
    def connect():

        print("\n==============================")
        print("✅ Socket Client Connected")
        print("==============================")




    # =================================================
    # DISCONNECT
    # =================================================

    @socketio.on("disconnect")
    def disconnect():

        print("❌ Socket Client Disconnected")





    # =================================================
    # USER ONLINE
    # =================================================

    @socketio.on("user_online")
    def user_online(data):

        user_id = data.get(
            "user_id"
        )


        if user_id:

            online_users.add(
                user_id
            )


            # personal room

            join_room(
                f"user_{user_id}"
            )



            print(
                f"🟢 User {user_id} online"
            )



            emit(

                "user_connected",

                {
                    "user_id":user_id
                },

                broadcast=True

            )







    # =================================================
    # GET ONLINE USERS
    # =================================================

    @socketio.on("get_online_users")
    def get_online_users():


        emit(

            "online_users",

            list(online_users)

        )








    # =================================================
    # USER OFFLINE
    # =================================================

    @socketio.on("disconnect")
    def user_disconnect():


        print(
            "Socket disconnected"
        )







    # =================================================
    # JOIN CONVERSATION
    # =================================================

    @socketio.on("join_room")
    def join_conversation(data):


        conversation_id = data.get(
            "conversation_id"
        )


        if conversation_id:


            room = (
                f"conversation_{conversation_id}"
            )


            join_room(room)



            print(
                "Joined:",
                room
            )








    # =================================================
    # LEAVE CONVERSATION
    # =================================================

    @socketio.on("leave_room")
    def leave_conversation(data):


        conversation_id = data.get(
            "conversation_id"
        )


        if conversation_id:


            leave_room(

                f"conversation_{conversation_id}"

            )







    # =================================================
    # SEND MESSAGE
    # =================================================

    @socketio.on("send_message")
    def send_message(data):


        print("\n📨 MESSAGE")
        print(data)



        conversation_id = data.get(
            "conversation_id"
        )


        sender_id = data.get(
            "sender_id"
        )


        receiver_id = data.get(
            "receiver_id"
        )


        text = data.get(
            "message"
        )



        if not text:

            return





        # SAVE DATABASE

        message = Message(

            conversation_id=
            conversation_id,

            sender_id=
            sender_id,

            receiver_id=
            receiver_id,

            message=
            text

        )


        db.session.add(
            message
        )




        # UPDATE CONVERSATION TIME

        conversation = Conversation.query.get(
            conversation_id
        )


        if conversation:

            conversation.updated_at = datetime.utcnow()



        db.session.commit()





        message_data = {


            "id":
            message.id,


            "conversation_id":
            conversation_id,


            "sender_id":
            sender_id,


            "receiver_id":
            receiver_id,


            "message":
            message.message,


            "is_read":
            False,


            "created_at":
            message.created_at.isoformat()


        }





        # SEND TO CHAT WINDOW

        emit(

            "receive_message",

            message_data,

            room=
            f"conversation_{conversation_id}"

        )






        # SEND NOTIFICATION

        emit(

            "new_message",

            message_data,

            room=
            f"user_{receiver_id}"

        )









    # =================================================
    # TYPING
    # =================================================

    @socketio.on("typing")
    def typing(data):


        conversation_id = data.get(
            "conversation_id"
        )


        emit(

            "user_typing",

            data,

            room=
            f"conversation_{conversation_id}",

            include_self=False

        )








    # =================================================
    # MARK READ
    # =================================================

    @socketio.on("mark_read")
    def mark_read(data):


        conversation_id = data.get(
            "conversation_id"
        )


        user_id = data.get(
            "user_id"
        )



        messages = Message.query.filter_by(

            conversation_id=
            conversation_id,

            receiver_id=
            user_id,

            is_read=False

        ).all()



        for msg in messages:

            msg.is_read = True



        db.session.commit()



        emit(

            "messages_read",

            {
                "conversation_id":
                conversation_id
            },

            room=
            f"conversation_{conversation_id}"

        )