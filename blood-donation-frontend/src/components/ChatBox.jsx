import { useEffect, useRef, useState } from "react";
import socket from "../socket";

const API = "http://127.0.0.1:5000";


export default function ChatBox() {


    // ============================================
    // CURRENT USER
    // ============================================

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const token = localStorage.getItem(
        "token"
    );



    // ============================================
    // STATES
    // ============================================


    // Available users (admin/donors/patients)
    const [users, setUsers] = useState([]);



    // Selected person to chat with
    const [selectedUser, setSelectedUser] = useState(null);



    // Current conversation
    const [conversationId, setConversationId] = useState(null);



    // Messages
    const [messages, setMessages] = useState([]);



    // Input text
    const [text, setText] = useState("");



    // Typing user
    const [typingUserId, setTypingUserId] = useState(null);



    // Online users
    const [onlineUsers, setOnlineUsers] = useState([]);



    // Unread messages
    const [unreadCounts, setUnreadCounts] = useState({});





    // ============================================
    // REFERENCES
    // ============================================


    const messagesEndRef = useRef(null);



    // ============================================
    // COMPONENT CHECK
    // ============================================


    useEffect(() => {


        if (!user) {

            console.error(
                "No logged in user found"
            );

            return;

        }


        console.log(
            "Chat user:",
            user
        );


    }, []);


    // ============================================
    // USER ONLINE
    // ============================================

    useEffect(() => {

        if (!user) return;


        socket.emit(
            "user_online",
            {
                user_id: user.id
            }
        );


    }, []);





    // ============================================
    // LOAD CHAT USERS
    // ============================================

    useEffect(() => {


        fetch(
            `${API}/api/chat/users`,
            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setUsers(data);

        })

        .catch(err => {

            console.error(
                "Users error:",
                err
            );

        });


    }, []);





    // ============================================
    // CREATE CONVERSATION
    // ============================================

    useEffect(() => {


        if (!selectedUser) return;



        fetch(

            `${API}/api/chat/conversation/${selectedUser.id}`,

            {

                method: "POST",

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {


            setConversationId(
                data.conversation_id
            );


            setUnreadCounts(prev => ({

                ...prev,

                [selectedUser.id]: 0

            }));


        })

        .catch(err => {

            console.error(
                "Conversation error:",
                err
            );

        });


    }, [selectedUser]);





    // ============================================
    // LOAD MESSAGES + SOCKET EVENTS
    // ============================================

    useEffect(() => {


        if (!conversationId) return;




        fetch(

            `${API}/api/chat/messages/${conversationId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setMessages(data);

        });





        socket.emit(

            "join_room",

            {

                conversation_id:
                    conversationId

            }

        );





        // RECEIVE MESSAGE

        const receiveMessage = (message) => {


            setMessages(prev => {


                const exists = prev.find(

                    msg =>
                        msg.id === message.id

                );


                if (exists) {

                    return prev;

                }


                return [

                    ...prev,

                    message

                ];


            });



        };






        // MESSAGE DELIVERED

        const messageDelivered = ({
            message_id

        }) => {


            setMessages(prev =>

                prev.map(msg =>


                    msg.id === message_id

                    ?

                    {

                        ...msg,

                        delivered:true

                    }

                    :

                    msg


                )

            );


        };






        // MESSAGE READ

        const messagesRead = ({
            message_ids

        }) => {


            setMessages(prev =>


                prev.map(msg =>


                    message_ids.includes(msg.id)

                    ?

                    {

                        ...msg,

                        is_read:true

                    }

                    :

                    msg


                )


            );


        };






        // USER TYPING

        const userTyping = ({
            sender_id

        }) => {


            setTypingUserId(
                sender_id
            );


        };






        // STOP TYPING

        const userStoppedTyping = () => {


            setTypingUserId(
                null
            );


        };







        // ONLINE USER

        const userOnline = ({
            user_id

        }) => {


            setOnlineUsers(prev => {


                if (
                    prev.includes(user_id)
                ) {

                    return prev;

                }


                return [

                    ...prev,

                    user_id

                ];


            });


        };





        socket.on(
            "receive_message",
            receiveMessage
        );


        socket.on(
            "message_delivered",
            messageDelivered
        );


        socket.on(
            "messages_read",
            messagesRead
        );


        socket.on(
            "typing",
            userTyping
        );


        socket.on(
            "stop_typing",
            userStoppedTyping
        );


        socket.on(
            "user_online",
            userOnline
        );





        return () => {


            socket.emit(

                "leave_room",

                {

                    conversation_id:
                        conversationId

                }

            );



            socket.off(
                "receive_message",
                receiveMessage
            );


            socket.off(
                "message_delivered",
                messageDelivered
            );


            socket.off(
                "messages_read",
                messagesRead
            );


            socket.off(
                "typing",
                userTyping
            );


            socket.off(
                "stop_typing",
                userStoppedTyping
            );


            socket.off(
                "user_online",
                userOnline
            );


        };


    }, [conversationId]);





    // ============================================
    // AUTO SCROLL
    // ============================================

    useEffect(() => {


        messagesEndRef.current?.scrollIntoView({

            behavior:"smooth"

        });


    }, [messages]);
    // ============================================
    // SEND MESSAGE
    // ============================================

    const sendMessage = () => {


        if (!text.trim()) return;


        if (!selectedUser) return;


        if (!conversationId) return;



        const messageText = text;



        const payload = {


            conversation_id: conversationId,


            sender_id: user.id,


            receiver_id: selectedUser.id,


            message: messageText


        };





        // Show immediately

        setMessages(prev => [


            ...prev,


            {


                id: Date.now(),


                conversation_id: conversationId,


                sender_id: user.id,


                receiver_id: selectedUser.id,


                message: messageText,


                created_at:
                    new Date().toISOString(),


                delivered:false,


                is_read:false


            }


        ]);





        socket.emit(

            "send_message",

            payload

        );





        socket.emit(

            "stop_typing",

            {

                conversation_id:
                    conversationId,


                sender_id:
                    user.id

            }

        );





        setText("");



    };







    // ============================================
    // INPUT CHANGE
    // ============================================

    const handleChange = (e) => {


        const value = e.target.value;


        setText(value);




        if (!conversationId) return;





        if (value.trim()) {


            socket.emit(

                "typing",

                {

                    conversation_id:
                        conversationId,


                    sender_id:
                        user.id

                }

            );


        }

        else {


            socket.emit(

                "stop_typing",

                {

                    conversation_id:
                        conversationId,


                    sender_id:
                        user.id

                }

            );


        }


    };








    // ============================================
    // ENTER KEY SEND
    // ============================================

    const handleKeyDown = (e) => {


        if (

            e.key === "Enter"

            &&

            !e.shiftKey

        ) {


            e.preventDefault();


            sendMessage();


        }


    };








    // ============================================
    // FORMAT TIME
    // ============================================

    const formatTime = (date) => {


        if (!date) return "";



        return new Date(date)

            .toLocaleTimeString(

                [],

                {

                    hour:"2-digit",

                    minute:"2-digit"

                }

            );


    };








    // ============================================
    // MESSAGE STATUS
    // ============================================

    const getStatus = (msg) => {



        if (msg.is_read) {


            return "✓✓";


        }



        if (msg.delivered) {


            return "✓";


        }



        return "🕓";


    };








    // ============================================
    // CHECK ONLINE
    // ============================================

    const isOnline = (userId) => {


        return onlineUsers.includes(
            userId
        );


    };








    // ============================================
    // SELECT USER
    // ============================================

    const openConversation = (u) => {


        setSelectedUser(u);



        setUnreadCounts(prev => ({


            ...prev,


            [u.id]:0


        }));


    };
    // ============================================
    // UI
    // ============================================

    return (

        <div className="flex h-[650px] bg-white rounded-xl shadow-lg overflow-hidden">


            {/* =====================================
                USERS SIDEBAR
            ====================================== */}

            <div className="w-1/3 border-r bg-gray-50 flex flex-col">


                <div className="bg-red-600 text-white p-4">

                    <h2 className="text-xl font-bold">

                        💬 LifeLink Chat

                    </h2>

                </div>




                <div className="flex-1 overflow-y-auto">


                    {users.map((u) => (


                        <div

                            key={u.id}

                            onClick={() =>
                                openConversation(u)
                            }

                            className={`

                                p-4

                                flex

                                items-center

                                justify-between

                                cursor-pointer

                                border-b

                                hover:bg-gray-200


                                ${
                                    selectedUser?.id === u.id

                                    ?

                                    "bg-red-100"

                                    :

                                    ""

                                }

                            `}

                        >



                            <div className="flex items-center gap-3">


                                <div className="relative">


                                    <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">


                                        {
                                            u.full_name
                                            ?.charAt(0)
                                            .toUpperCase()
                                        }


                                    </div>



                                    {isOnline(u.id) && (

                                        <span

                                            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"

                                        ></span>

                                    )}


                                </div>




                                <div>


                                    <p className="font-semibold">

                                        {u.full_name}

                                    </p>


                                    <p className="text-xs text-gray-500">

                                        {u.role}

                                    </p>


                                </div>


                            </div>




                            {unreadCounts[u.id] > 0 && (

                                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">

                                    {unreadCounts[u.id]}

                                </span>

                            )}



                        </div>


                    ))}


                </div>


            </div>






            {/* =====================================
                CHAT AREA
            ====================================== */}


            <div className="flex-1 flex flex-col">





                {/* HEADER */}

                <div className="p-4 border-b flex items-center gap-3">


                    {selectedUser ? (

                        <>


                            <div className="relative">


                                <div className="w-10 h-10 bg-red-500 rounded-full text-white flex items-center justify-center font-bold">


                                    {
                                        selectedUser.full_name
                                        ?.charAt(0)
                                        .toUpperCase()
                                    }


                                </div>



                                {isOnline(selectedUser.id) && (

                                    <span

                                        className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"

                                    ></span>

                                )}



                            </div>





                            <div>


                                <h2 className="font-bold">

                                    {selectedUser.full_name}

                                </h2>



                                <p className="text-xs text-gray-500">


                                    {
                                        typingUserId === selectedUser.id

                                        ?

                                        "typing..."

                                        :

                                        isOnline(selectedUser.id)

                                        ?

                                        "Online"

                                        :

                                        "Offline"

                                    }


                                </p>


                            </div>


                        </>


                    ) : (


                        <p className="text-gray-500">

                            Select a user

                        </p>


                    )}



                </div>






                {/* MESSAGES */}


                <div className="flex-1 overflow-y-auto p-4 bg-gray-100">


                    {messages.map((msg) => (


                        <div

                            key={msg.id}

                            className={`flex mb-3

                                ${
                                    msg.sender_id === user.id

                                    ?

                                    "justify-end"

                                    :

                                    "justify-start"

                                }

                            `}

                        >



                            <div

                                className={`

                                    max-w-[70%]

                                    px-4

                                    py-2

                                    rounded-lg

                                    shadow


                                    ${
                                        msg.sender_id === user.id

                                        ?

                                        "bg-red-600 text-white"

                                        :

                                        "bg-white"

                                    }

                                `}

                            >



                                <p>

                                    {msg.message}

                                </p>



                                <div className="text-xs flex justify-end gap-1 mt-1">


                                    <span>

                                        {formatTime(msg.created_at)}

                                    </span>



                                    {
                                        msg.sender_id === user.id && (

                                            <span>

                                                {getStatus(msg)}

                                            </span>

                                        )
                                    }


                                </div>


                            </div>


                        </div>


                    ))}





                    {
                        typingUserId === selectedUser?.id && (

                            <div className="text-sm text-gray-500">

                                typing...

                            </div>

                        )
                    }



                    <div ref={messagesEndRef}></div>


                </div>








                {/* INPUT */}


                <div className="p-4 border-t flex gap-3">


                    <textarea

                        value={text}

                        onChange={handleChange}

                        onKeyDown={handleKeyDown}

                        placeholder="Write message..."

                        rows="1"

                        className="flex-1 border rounded-lg p-2"

                    />



                    <button

                        onClick={sendMessage}

                        className="bg-red-600 text-white px-6 rounded-lg"

                    >

                        Send

                    </button>



                </div>



            </div>


        </div>


    );


}
