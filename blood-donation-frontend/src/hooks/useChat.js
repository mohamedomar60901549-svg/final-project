import { useCallback, useEffect, useRef, useState } from "react";
import socket from "../socket";
import {
    createConversation,
    getMessages,
} from "../services/chatService";

export default function useChat(user) {
    // =====================================
    // STATE
    // =====================================

    const [conversationId, setConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUser, setTypingUser] = useState(null);
    const [notifications, setNotifications] = useState({});
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // =====================================
    // USER ONLINE
    // =====================================

    useEffect(() => {
        if (!user) return;

        socket.emit("user_online", {
            user_id: user.id,
        });

        socket.emit("get_online_users");
    }, [user]);

    // =====================================
    // LOAD CONVERSATION
    // =====================================

    const loadConversation = useCallback(
        async (otherUserId) => {
            if (!user) return;

            setLoading(true);

            try {
                const conversation =
                    await createConversation(otherUserId);

                if (!conversation?.conversation_id) {
                    setLoading(false);
                    return;
                }

                const id = conversation.conversation_id;

                if (
                    conversationId &&
                    conversationId !== id
                ) {
                    socket.emit("leave_room", {
                        conversation_id: conversationId,
                    });
                }

                setConversationId(id);

                const history = await getMessages(id);

                setMessages(
                    Array.isArray(history) ? history : []
                );

                socket.emit("join_room", {
                    conversation_id: id,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
        [conversationId, user]
    );

    // =====================================
    // SOCKET EVENTS
    // =====================================

    useEffect(() => {
        if (!user) return;

        const handleReceiveMessage = (data) => {
            if (
                conversationId &&
                data.conversation_id !== conversationId
            ) {
                return;
            }

            setMessages((prev) => {
                const exists = prev.some(
                    (msg) => msg.id === data.id
                );

                if (exists) {
                    return prev;
                }

                return [...prev, data];
            });

            socket.emit("message_delivered", {
                message_id: data.id,
            });
        };

        const handleOnlineUsers = (users) => {
            setOnlineUsers(users);
        };

        const handleUserConnected = (data) => {
            setOnlineUsers((prev) => {
                if (prev.includes(data.user_id)) {
                    return prev;
                }

                return [...prev, data.user_id];
            });
        };

        const handleUserDisconnected = (data) => {
            setOnlineUsers((prev) =>
                prev.filter(
                    (id) => id !== data.user_id
                )
            );
        };

        const handleTyping = (data) => {
            if (data.user_id === user.id) {
                return;
            }

            setTypingUser(data.user_name);

            setTimeout(() => {
                setTypingUser(null);
            }, 2000);
        };

        socket.on(
            "receive_message",
            handleReceiveMessage
        );

        socket.on(
            "online_users",
            handleOnlineUsers
        );

        socket.on(
            "user_connected",
            handleUserConnected
        );

        socket.on(
            "user_disconnected",
            handleUserDisconnected
        );

        socket.on(
            "user_typing",
            handleTyping
        );
                const handleNotification = (data) => {
            setNotifications((prev) => ({
                ...prev,
                [data.sender_id]:
                    (prev[data.sender_id] || 0) + 1,
            }));
        };

        const handleMessageDelivered = (data) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === data.message_id
                        ? { ...msg, delivered: true }
                        : msg
                )
            );
        };

        const handleMessageRead = (data) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === data.message_id
                        ? { ...msg, is_read: true }
                        : msg
                )
            );
        };

        socket.on(
            "new_notification",
            handleNotification
        );

        socket.on(
            "message_delivered",
            handleMessageDelivered
        );

        socket.on(
            "message_read",
            handleMessageRead
        );

        return () => {
            socket.off(
                "receive_message",
                handleReceiveMessage
            );

            socket.off(
                "online_users",
                handleOnlineUsers
            );

            socket.off(
                "user_connected",
                handleUserConnected
            );

            socket.off(
                "user_disconnected",
                handleUserDisconnected
            );

            socket.off(
                "user_typing",
                handleTyping
            );

            socket.off(
                "new_notification",
                handleNotification
            );

            socket.off(
                "message_delivered",
                handleMessageDelivered
            );

            socket.off(
                "message_read",
                handleMessageRead
            );
        };
    }, [conversationId, user]);

    // =====================================
    // AUTO SCROLL
    // =====================================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    // =====================================
    // SEND MESSAGE
    // =====================================

    const sendMessage = (receiverId, text) => {
        if (!conversationId) return;

        const message = text.trim();

        if (!message) return;

        socket.emit("send_message", {
            conversation_id: conversationId,
            sender_id: user.id,
            receiver_id: receiverId,
            message,
        });
    };

    // =====================================
    // TYPING
    // =====================================

    const sendTyping = () => {
        if (!conversationId) return;

        socket.emit("typing", {
            conversation_id: conversationId,
            user_id: user.id,
            user_name: user.full_name,
        });
    };

    // =====================================
    // LEAVE ROOM ON UNMOUNT
    // =====================================

    useEffect(() => {
        return () => {
            if (conversationId) {
                socket.emit("leave_room", {
                    conversation_id: conversationId,
                });
            }
        };
    }, [conversationId]);

    // =====================================
    // RETURN
    // =====================================

    return {
        loading,

        conversationId,

        messages,

        onlineUsers,

        typingUser,

        notifications,

        messagesEndRef,

        loadConversation,

        sendMessage,

        sendTyping,

        setMessages,

        setConversationId,
    };
}