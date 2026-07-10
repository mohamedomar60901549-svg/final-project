import { useEffect, useRef, useState } from "react";
import socket from "../../socket";

const API = "http://127.0.0.1:5000";

export default function AdminChatPage() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // ==========================
    // STATES
    // ==========================

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [typingUser, setTypingUser] = useState(null);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [notifications, setNotifications] = useState({});

    const messagesEndRef = useRef(null);

    // ==========================
    // USER ONLINE
    // ==========================

    useEffect(() => {

        if (!user) return;

        socket.emit("user_online", {
            user_id: user.id
        });

        socket.emit("get_online_users");

    }, []);

    // ==========================
    // LOAD USERS
    // ==========================

    useEffect(() => {

        fetch(`${API}/api/chat/users`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })

        .then(res => res.json())

        .then(data => {

            setUsers(data);

        })

        .catch(console.error);

    }, []);

        // ==========================
    // OPEN CONVERSATION
    // ==========================

    const openConversation = async (selected) => {

        setSelectedUser(selected);

        try {

            const response = await fetch(

                `${API}/api/chat/conversation/${selected.id}`,

                {

                    method: "POST",

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            const data = await response.json();

            setConversationId(data.conversation_id);

            setNotifications(prev => ({

                ...prev,

                [selected.id]: 0

            }));

        }

        catch (err) {

            console.error(err);

        }

    };


    // ==========================
    // LOAD MESSAGES
    // ==========================

    useEffect(() => {

        if (!conversationId) return;

        fetch(

            `${API}/api/chat/messages/${conversationId}`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setMessages(data);

        });

        socket.emit("join_room", {

            conversation_id: conversationId

        });

        socket.emit("conversation_opened", {

            conversation_id: conversationId,

            user_id: user.id

        });

        return () => {

            socket.emit("leave_room", {

                conversation_id: conversationId

            });

        };

    }, [conversationId]);


    // ==========================
    // SIDEBAR
    // ==========================

    const Sidebar = () => (

        <div className="w-80 border-r bg-white flex flex-col">

            <div className="bg-red-600 text-white p-5">

                <h2 className="text-xl font-bold">

                    💬 Chats

                </h2>

            </div>

            <div className="flex-1 overflow-y-auto">

                {

                    users.map((u) => (

                        <div

                            key={u.id}

                            onClick={() => openConversation(u)}

                            className={`

                                flex

                                items-center

                                justify-between

                                p-4

                                cursor-pointer

                                border-b

                                hover:bg-gray-100

                                transition

                                ${selectedUser?.id === u.id

                                    ? "bg-red-50"

                                    : ""}

                            `}

                        >

                            <div className="flex items-center gap-3">

                                <div className="relative">

                                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">

                                        {u.full_name.charAt(0).toUpperCase()}

                                    </div>

                                    {

                                        onlineUsers.includes(u.id) && (

                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>

                                        )

                                    }

                                </div>

                                <div>

                                    <h3 className="font-semibold">

                                        {u.full_name}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {u.role}

                                    </p>

                                </div>

                            </div>

                            {

                                notifications[u.id] > 0 && (

                                    <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1">

                                        {notifications[u.id]}

                                    </span>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

        // ==========================
    // SOCKET LISTENERS
    // ==========================

    useEffect(() => {


        // ==========================
        // RECEIVE NEW MESSAGE
        // ==========================

        socket.on("receive_message", (data) => {


            if (
                data.conversation_id === conversationId
            ) {

                setMessages(prev => [

                    ...prev,

                    data

                ]);


                socket.emit(
                    "message_delivered",
                    {
                        message_id: data.id
                    }
                );

            }

            else {


                setNotifications(prev => ({

                    ...prev,

                    [data.sender_id]:

                    (prev[data.sender_id] || 0) + 1

                }));

            }


        });



        // ==========================
        // ONLINE USERS
        // ==========================

        socket.on(
            "online_users",
            (data)=>{


                setOnlineUsers(data);


            }
        );



        // ==========================
        // USER CONNECTED
        // ==========================

        socket.on(
            "user_connected",
            (data)=>{


                setOnlineUsers(prev=>[

                    ...prev,

                    data.user_id

                ]);


            }
        );



        // ==========================
        // USER DISCONNECTED
        // ==========================

        socket.on(
            "user_disconnected",
            (data)=>{


                setOnlineUsers(prev =>

                    prev.filter(

                        id => id !== data.user_id

                    )

                );


            }
        );



        // ==========================
        // TYPING
        // ==========================

        socket.on(
            "user_typing",
            (data)=>{


                if(
                    data.user_id !== user.id
                ){

                    setTypingUser(
                        data.user_name
                    );


                    setTimeout(()=>{

                        setTypingUser(null);

                    },2000);

                }


            }
        );



        // ==========================
        // MESSAGE READ
        // ==========================

        socket.on(
            "message_read",
            (data)=>{


                setMessages(prev =>

                    prev.map(msg =>

                        msg.id === data.message_id

                        ?

                        {

                            ...msg,

                            read:true

                        }

                        :

                        msg

                    )

                );


            }
        );



        // ==========================
        // MESSAGE DELIVERED
        // ==========================

        socket.on(
            "message_delivered",
            (data)=>{


                setMessages(prev =>

                    prev.map(msg =>

                        msg.id === data.message_id

                        ?

                        {

                            ...msg,

                            delivered:true

                        }

                        :

                        msg

                    )

                );


            }
        );




        return ()=>{


            socket.off("receive_message");

            socket.off("online_users");

            socket.off("user_connected");

            socket.off("user_disconnected");

            socket.off("user_typing");

            socket.off("message_read");

            socket.off("message_delivered");


        };


    },[conversationId]);




    // ==========================
    // AUTO SCROLL
    // ==========================

    useEffect(()=>{


        messagesEndRef.current?.scrollIntoView({

            behavior:"smooth"

        });


    },[messages]);





    // ==========================
    // TYPING EVENT
    // ==========================

    const handleTyping = (e)=>{


        setMessage(e.target.value);



        if(selectedUser){


            socket.emit(
                "typing",
                {

                    conversation_id:
                    conversationId,

                    user_id:user.id,

                    user_name:
                    user.full_name

                }

            );

        }


    };

        // ==========================
    // SEND MESSAGE
    // ==========================

    const sendMessage = () => {


        if (!message.trim()) return;

        if (!selectedUser) return;



        const data = {


            conversation_id: conversationId,

            sender_id: user.id,

            receiver_id: selectedUser.id,

            message: message.trim(),

            created_at: new Date()

        };



        socket.emit(
            "send_message",
            data
        );


        setMessage("");



    };



    // ==========================
    // ENTER KEY SEND
    // ==========================

    const handleKeyPress = (e)=>{


        if(e.key==="Enter"){

            sendMessage();

        }


    };




    // ==========================
    // MESSAGE AREA
    // ==========================

    const ChatArea = () => (


        <div className="flex-1 flex flex-col bg-gray-100">


            {
                selectedUser ?

                <>


                {/* HEADER */}

                <div className="bg-white border-b p-4 flex items-center gap-3">


                    <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">

                        {
                            selectedUser.full_name
                            .charAt(0)
                            .toUpperCase()
                        }

                    </div>


                    <div>

                        <h2 className="font-bold">

                            {selectedUser.full_name}

                        </h2>


                        <p className="text-sm text-gray-500">


                            {
                                onlineUsers.includes(
                                    selectedUser.id
                                )

                                ?

                                "Online"

                                :

                                "Offline"

                            }


                        </p>


                    </div>


                </div>





                {/* MESSAGES */}


                <div className="flex-1 overflow-y-auto p-5 space-y-3">


                {

                    messages.map((msg)=>(


                        <div

                        key={msg.id}

                        className={

                            `flex

                            ${
                                msg.sender_id === user.id

                                ?

                                "justify-end"

                                :

                                "justify-start"

                            }`

                        }

                        >



                        <div

                        className={

                        `max-w-md

                        px-4

                        py-3

                        rounded-2xl

                        shadow

                        ${
                            msg.sender_id === user.id

                            ?

                            "bg-red-600 text-white rounded-br-none"

                            :

                            "bg-white text-gray-800 rounded-bl-none"

                        }`

                        }

                        >



                        <p>

                            {msg.message}

                        </p>



                        <div className="text-xs mt-1 opacity-70 flex justify-end gap-1">


                            {

                            new Date(
                                msg.created_at
                            )
                            .toLocaleTimeString(
                                [],
                                {
                                    hour:"2-digit",
                                    minute:"2-digit"
                                }
                            )

                            }



                            {

                                msg.sender_id === user.id && (

                                    <span>

                                    {

                                    msg.read

                                    ?

                                    "✓✓"

                                    :

                                    msg.delivered

                                    ?

                                    "✓✓"

                                    :

                                    "✓"

                                    }

                                    </span>

                                )

                            }



                        </div>


                        </div>



                        </div>


                    ))

                }



                <div ref={messagesEndRef}/>


                </div>






                {/* TYPING */}


                {

                typingUser && (

                    <div className="px-5 text-sm text-gray-500">

                        {typingUser} is typing...

                    </div>

                )

                }





                {/* INPUT */}


                <div className="bg-white p-4 border-t flex gap-3">


                    <input

                    value={message}

                    onChange={handleTyping}

                    onKeyDown={handleKeyPress}

                    placeholder="Type a message..."

                    className="flex-1 border rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-red-500"

                    />



                    <button

                    onClick={sendMessage}

                    className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-full font-semibold"

                    >

                        Send

                    </button>



                </div>




                </>



                :


                <div className="flex-1 flex items-center justify-center text-gray-500">


                    <div className="text-center">


                        <h2 className="text-2xl font-bold">

                            💬 LifeLink Chat

                        </h2>


                        <p>

                            Select a user to start conversation

                        </p>


                    </div>


                </div>


            }



        </div>


    );





    // ==========================
    // PAGE RETURN
    // ==========================


    return (

        <div className="h-screen flex bg-gray-100">


            <Sidebar />


            <ChatArea />


        </div>

    );


}