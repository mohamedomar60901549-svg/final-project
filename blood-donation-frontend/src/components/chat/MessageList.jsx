import { useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({
    messages = [],
    currentUserId,
    messagesEndRef,
    loading = false,
}) {
    // =====================================
    // AUTO SCROLL
    // =====================================

    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, messagesEndRef]);

    // =====================================
    // LOADING
    // =====================================

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-gray-500 animate-pulse">
                    Loading conversation...
                </div>
            </div>
        );
    }

    // =====================================
    // EMPTY CHAT
    // =====================================

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-center">

                    <div className="text-6xl mb-4">
                        💬
                    </div>

                    <h2 className="text-xl font-semibold text-gray-700">
                        No messages yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start the conversation by sending a message.
                    </p>

                </div>
            </div>
        );
    }

    // =====================================
    // MESSAGE LIST
    // =====================================

    return (
        <div
            className="
                flex-1
                overflow-y-auto
                bg-gray-100
                px-5
                py-4
                space-y-1
            "
        >
            {messages.map((msg) => (
                <MessageBubble
                    key={msg.id}
                    message={msg}
                    currentUserId={currentUserId}
                />
            ))}

            <div ref={messagesEndRef} />
        </div>
    );
}