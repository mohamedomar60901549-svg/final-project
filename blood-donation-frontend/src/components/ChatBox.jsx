import { useEffect, useRef, useState } from "react";
import socket from "../socket";

const API = "http://127.0.0.1:5000";

export default function ChatBox() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    const messagesEndRef = useRef(null);



    // ============================================
    // LOAD USERS
    // ============================================

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

            .catch(err => console.log(err));

    }, []);





    // ============================================
    // CREATE CONVERSATION WHEN USER IS SELECTED
    // ============================================

    useEffect(() => {

        if (!selectedUser) return;

        fetch(

            `${API}/api/chat/conversation/${selectedUser.id}`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

            .then(res => res.json())

            .then(data => {

                setConversationId(data.conversation_id);

            });

    }, [selectedUser]);






    // ============================================
    // LOAD MESSAGES
    // ============================================

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




        socket.emit(

            "join_room",

            {

                conversation_id: conversationId

            }

        );




        const receiveMessage = (message) => {

            setMessages(prev => {

                const exists = prev.find(

                    m => m.id === message.id

                );

                if (exists) return prev;

                return [...prev, message];

            });

        };



        socket.on(

            "receive_message",

            receiveMessage

        );



        return () => {

            socket.off(

                "receive_message",

                receiveMessage

            );

        };

    }, [conversationId]);






    // ============================================
    // AUTO SCROLL
    // ============================================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({

            behavior: "smooth"

        });

    }, [messages]);






    // ============================================
    // SEND MESSAGE
    // ============================================

    const sendMessage = () => {

        if (!text.trim()) return;

        if (!selectedUser) return;

        const payload = {

            conversation_id: conversationId,

            sender_id: user.id,

            receiver_id: selectedUser.id,

            message: text

        };

        socket.emit(

            "send_message",

            payload

        );

        setText("");

    };






    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            sendMessage();

        }

    };

    return (

    <div className="flex h-[75vh] bg-white rounded-lg shadow overflow-hidden">

        {/* ============================
            USERS SIDEBAR
        ============================ */}

        <div className="w-72 border-r bg-gray-50">

            <div className="p-4 border-b">

                <h2 className="text-xl font-bold">
                    💬 Users
                </h2>

            </div>

            <div className="overflow-y-auto h-full">

                {
                    users.length === 0 ? (

                        <p className="p-4 text-gray-500">
                            No users found
                        </p>

                    ) : (

                        users.map((u) => (

                            <div

                                key={u.id}

                                onClick={() => setSelectedUser(u)}

                                className={`

                                    p-4

                                    cursor-pointer

                                    border-b

                                    hover:bg-red-50

                                    ${selectedUser?.id === u.id
                                        ? "bg-red-100"
                                        : ""
                                    }

                                `}

                            >

                                <h3 className="font-semibold">

                                    {u.full_name}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    {u.role}

                                </p>

                            </div>

                        ))

                    )

                }

            </div>

        </div>



        {/* ============================
                CHAT AREA
        ============================ */}

        <div className="flex flex-col flex-1">

            {/* Header */}

            <div className="border-b p-4">

                {

                    selectedUser ?

                        (

                            <>

                                <h2 className="font-bold text-xl">

                                    {selectedUser.full_name}

                                </h2>

                                <p className="text-sm text-gray-500">

                                    {selectedUser.role}

                                </p>

                            </>

                        )

                        :

                        (

                            <h2 className="text-gray-500">

                                Select a user to start chatting

                            </h2>

                        )

                }

            </div>



            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

                {

                    messages.map((msg) => (

                        <div

                            key={msg.id}

                            className={`

                                mb-3 flex

                                ${msg.sender_id === user.id

                                    ? "justify-end"

                                    : "justify-start"

                                }

                            `}

                        >

                            <div

                                className={`

                                    px-4

                                    py-2

                                    rounded-lg

                                    max-w-[70%]

                                    ${msg.sender_id === user.id

                                        ? "bg-red-600 text-white"

                                        : "bg-white border"

                                    }

                                `}

                            >

                                {msg.message}

                            </div>

                        </div>

                    ))

                }

                <div ref={messagesEndRef}></div>

            </div>



            {/* Input */}

            {

                selectedUser && (

                    <div className="border-t p-4 flex gap-2">

                        <input

                            type="text"

                            value={text}

                            onChange={(e) => setText(e.target.value)}

                            onKeyDown={handleKeyDown}

                            placeholder={`Message ${selectedUser.full_name}`}

                            className="flex-1 border rounded-lg px-4 py-2"

                        />

                        <button

                            onClick={sendMessage}

                            className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-lg"

                        >

                            Send

                        </button>

                    </div>

                )

            }

        </div>

    </div>

);

}