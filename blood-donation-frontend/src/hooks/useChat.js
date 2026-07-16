import { useEffect, useRef, useState } from "react";
import socket from "../socket";
import {
    getMessages
} from "../services/chatService";

export default function useChat(user) {

    const [conversationId, setConversationId] = useState(null);

    const [messages, setMessages] = useState([]);

    const [onlineUsers, setOnlineUsers] = useState([]);

    const [typingUser, setTypingUser] = useState(null);

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

    }, [user]);



    // ==========================
    // LOAD CONVERSATION
    // ==========================

    const loadConversation = async (id) => {

        setConversationId(id);

        const data = await getMessages(id);

        setMessages(data);

        socket.emit("join_room", {
            conversation_id: id
        });

    };

        // ==========================
    // SOCKET EVENTS
    // ==========================

    useEffect(() => {

        socket.on("receive_message", (data) => {

            setMessages(prev => [...prev, data]);

            socket.emit("message_delivered", {
                message_id: data.id
            });

        });


        socket.on("online_users", (users) => {

            setOnlineUsers(users);

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

            if (data.user_id !== user.id) {

                setTypingUser(data.user_name);

                setTimeout(() => {

                    setTypingUser(null);

                }, 2000);

            }

        });


        socket.on("new_notification", (data) => {

            setNotifications(prev => ({

                ...prev,

                [data.sender_id]:
                    (prev[data.sender_id] || 0) + 1

            }));

        });


        socket.on("message_read", (data) => {

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === data.message_id
                        ? { ...msg, is_read: true }
                        : msg
                )
            );

        });


        socket.on("message_delivered", (data) => {

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === data.message_id
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
            socket.off("new_notification");
            socket.off("message_read");
            socket.off("message_delivered");

        };

    }, [user]);

        // ==========================
    // AUTO SCROLL
    // ==========================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);



    // ==========================
    // SEND MESSAGE
    // ==========================

    const sendMessage = (
        receiverId,
        text
    ) => {

        if (!text.trim()) return;

        if (!conversationId) return;

        socket.emit(
            "send_message",
            {

                conversation_id: conversationId,

                sender_id: user.id,

                receiver_id: receiverId,

                message: text.trim()

            }
        );

    };



    // ==========================
    // TYPING
    // ==========================

    const sendTyping = () => {

        if (!conversationId) return;

        socket.emit(
            "typing",
            {

                conversation_id: conversationId,

                user_id: user.id,

                user_name: user.full_name

            }
        );

    };



    // ==========================
    // LEAVE ROOM
    // ==========================

    useEffect(() => {

        return () => {

            if (conversationId) {

                socket.emit(
                    "leave_room",
                    {
                        conversation_id: conversationId
                    }
                );

            }

        };

    }, [conversationId]);



    // ==========================
    // RETURN
    // ==========================

    return {

        conversationId,

        setConversationId,

        loadConversation,

        messages,

        setMessages,

        onlineUsers,

        typingUser,

        notifications,

        sendMessage,

        sendTyping,

        messagesEndRef

    };

}