import { useEffect, useState } from "react";

import socket from "../../socket";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";

const API = "http://127.0.0.1:5000";

export default function AdminChatPage() {

    const user = JSON.parse(localStorage.getItem("user"));

    const token = localStorage.getItem("token");

    // ==========================================
    // STATE
    // ==========================================

    const [users, setUsers] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);

    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [typingUser, setTypingUser] = useState("");

    const [notifications, setNotifications] = useState({});

    // ==========================================
    // USER ONLINE
    // ==========================================

    useEffect(() => {

        if (!user) return;

        socket.emit("user_online", {

            user_id: user.id

        });

        socket.emit("get_online_users");

    }, []);

    // ==========================================
    // LOAD USERS
    // ==========================================

    useEffect(() => {

        fetch(

            `${API}/api/chat/users`,

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        )

        .then(res => res.json())

        .then(data => {

            setUsers(data);

        })

        .catch(console.error);

    }, []);

    // ==========================================
    // LOAD CONVERSATION
    // ==========================================

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

        return () => {

            socket.emit("leave_room", {

                conversation_id: conversationId

            });

        };

    }, [conversationId]);

    // ==========================================
    // SOCKET EVENTS
    // ==========================================

    useEffect(() => {

        socket.on("receive_message", (data) => {

            if (data.conversation_id === conversationId) {

                setMessages(prev => [...prev, data]);

            } else {

                setNotifications(prev => ({

                    ...prev,

                    [data.sender_id]:

                    (prev[data.sender_id] || 0) + 1

                }));

            }

        });

        socket.on("online_users", (list) => {

            setOnlineUsers(list);

        });

        socket.on("user_connected", ({ user_id }) => {

            setOnlineUsers(prev => {

                if (prev.includes(user_id)) return prev;

                return [...prev, user_id];

            });

        });

        socket.on("user_disconnected", ({ user_id }) => {

            setOnlineUsers(prev =>

                prev.filter(id => id !== user_id)

            );

        });

        socket.on("user_typing", (data) => {

            if (data.user_id !== user.id) {

                setTypingUser(data.user_name);

                setTimeout(() => {

                    setTypingUser("");

                }, 1500);

            }

        });

        socket.on("message_read", ({ message_id }) => {

            setMessages(prev =>

                prev.map(msg =>

                    msg.id === message_id

                        ? { ...msg, is_read: true }

                        : msg

                )

            );

        });

        socket.on("message_delivered", ({ message_id }) => {

            setMessages(prev =>

                prev.map(msg =>

                    msg.id === message_id

                        ? { ...msg, delivered: true }

                        : msg

                )

            );

        });

        return () => {

            socket.off("receive_message");

            socket.off("online_users");

            socket.off("user_connected");

            socket.off("user_disconnected");

            socket.off("user_typing");

            socket.off("message_read");

            socket.off("message_delivered");

        };

    }, [conversationId]);

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
            .then(setUsers)
            .catch(console.error);

    }, []);



    // ============================================
    // OPEN CONVERSATION
    // ============================================

    const openConversation = async (selected) => {

        setSelectedUser(selected);

        const res = await fetch(

            `${API}/api/chat/conversation/${selected.id}`,

            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await res.json();

        setConversationId(data.conversation_id);

        setNotifications(prev => ({
            ...prev,
            [selected.id]: 0
        }));

    };



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

        socket.emit("join_room", {
            conversation_id: conversationId
        });

        return () => {

            socket.emit("leave_room", {
                conversation_id: conversationId
            });

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
    // SOCKET EVENTS
    // ============================================

    useEffect(() => {

        socket.on("receive_message", (msg) => {

            if (msg.conversation_id !== conversationId)
                return;

            setMessages(prev => [...prev, msg]);

        });



        socket.on("online_users", (list) => {

            setOnlineUsers(list);

        });



        socket.on("user_connected", (data) => {

            setOnlineUsers(prev => {

                if (prev.includes(data.user_id))
                    return prev;

                return [...prev, data.user_id];

            });

        });



        socket.on("user_disconnected", (data) => {

            setOnlineUsers(prev =>

                prev.filter(id => id !== data.user_id)

            );

        });



        socket.on("user_typing", (data) => {

            if (data.user_id === user.id)
                return;

            setTypingUser(data.user_name);

            setTimeout(() => {

                setTypingUser(null);

            }, 1500);

        });



        socket.on("new_notification", (data) => {

            setNotifications(prev => ({

                ...prev,

                [data.sender_id]:

                    (prev[data.sender_id] || 0) + 1

            }));

        });



        return () => {

            socket.off("receive_message");

            socket.off("online_users");

            socket.off("user_connected");

            socket.off("user_disconnected");

            socket.off("user_typing");

            socket.off("new_notification");

        };

    }, [conversationId]);

        // ============================================
    // HANDLE TYPING
    // ============================================

    const handleTyping = (e) => {

        setMessage(e.target.value);

        if (!conversationId) return;

        socket.emit("typing", {

            conversation_id: conversationId,

            user_id: user.id,

            user_name: user.full_name

        });

    };



    // ============================================
    // SEND MESSAGE
    // ============================================

    const sendMessage = () => {

        if (!message.trim()) return;

        if (!conversationId) return;

        socket.emit("send_message", {

            conversation_id: conversationId,

            sender_id: user.id,

            receiver_id: selectedUser.id,

            message: message.trim()

        });

        setMessage("");

        inputRef.current?.focus();

    };



    // ============================================
    // ENTER KEY
    // ============================================

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            sendMessage();

        }

    };



    // ============================================
    // RETURN
    // ============================================

    return (

        <div className="h-screen flex bg-gray-100">

            {/* ================= SIDEBAR ================= */}

            <div className="w-80 bg-white border-r overflow-y-auto">

                <div className="bg-red-600 text-white p-5">

                    <h2 className="text-2xl font-bold">

                        💬 Chats

                    </h2>

                </div>

                {

                    users.map((u) => (

                        <div

                            key={u.id}

                            onClick={() => openConversation(u)}

                            className={`

                                p-4

                                cursor-pointer

                                border-b

                                hover:bg-gray-100

                                flex

                                justify-between

                                items-center

                                ${selectedUser?.id === u.id ? "bg-red-50" : ""}

                            `}

                        >

                            <div>

                                <div className="font-semibold">

                                    {u.full_name}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {

                                        onlineUsers.includes(u.id)

                                            ? "🟢 Online"

                                            : "⚪ Offline"

                                    }

                                </div>

                            </div>

                            {

                                notifications[u.id] > 0 && (

                                    <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">

                                        {notifications[u.id]}

                                    </span>

                                )

                            }

                        </div>

                    ))

                }

            </div>



            {/* ================= CHAT AREA ================= */}

            <div className="flex-1 flex flex-col">

                {

                    selectedUser ? (

                        <>

                            {/* HEADER */}

                            <div className="bg-white border-b p-4">

                                <h2 className="font-bold text-lg">

                                    {selectedUser.full_name}

                                </h2>

                                <p className="text-sm text-gray-500">

                                    {

                                        onlineUsers.includes(selectedUser.id)

                                            ? "Online"

                                            : "Offline"

                                    }

                                </p>

                            </div>



                            {/* MESSAGES */}

                            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-100">

                                {

                                    messages.map((msg) => (

                                        <div

                                            key={msg.id}

                                            className={`flex ${msg.sender_id === user.id

                                                ? "justify-end"

                                                : "justify-start"

                                                }`}

                                        >

                                            <div

                                                className={`

                                                    max-w-md

                                                    px-4

                                                    py-3

                                                    rounded-2xl

                                                    shadow

                                                    ${msg.sender_id === user.id

                                                        ? "bg-red-600 text-white"

                                                        : "bg-white"

                                                        }

                                                `}

                                            >

                                                <p>

                                                    {msg.message}

                                                </p>

                                                <div className="text-xs mt-2 opacity-70 text-right">

                                                    {

                                                        new Date(

                                                            msg.created_at

                                                        ).toLocaleTimeString(

                                                            [],

                                                            {

                                                                hour: "2-digit",

                                                                minute: "2-digit"

                                                            }

                                                        )

                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                                {

                                    typingUser && (

                                        <p className="text-sm text-gray-500 italic">

                                            {typingUser} is typing...

                                        </p>

                                    )

                                }

                                <div ref={messagesEndRef}></div>

                            </div>



                            {/* INPUT */}

                            <div className="bg-white border-t p-4 flex gap-3">

                                <input

                                    ref={inputRef}

                                    value={message}

                                    onChange={handleTyping}

                                    onKeyDown={handleKeyDown}

                                    placeholder="Type a message..."

                                    className="

                                        flex-1

                                        border

                                        rounded-full

                                        px-5

                                        py-3

                                        focus:ring-2

                                        focus:ring-red-500

                                        outline-none

                                    "

                                />

                                <button

                                    onClick={sendMessage}

                                    className="

                                        bg-red-600

                                        hover:bg-red-700

                                        text-white

                                        px-6

                                        rounded-full

                                    "

                                >

                                    Send

                                </button>

                            </div>

                        </>

                    ) : (

                        <div className="flex-1 flex items-center justify-center">

                            <div className="text-center text-gray-500">

                                <h2 className="text-3xl font-bold">

                                    💬 LifeLink Chat

                                </h2>

                                <p>

                                    Select a user to begin chatting.

                                </p>

                            </div>

                        </div>

                    )

                }

            </div>

        </div>

    );

}