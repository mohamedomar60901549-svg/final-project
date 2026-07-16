import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({
    messages,
    currentUserId
}) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    return (

        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-100">

            {

                messages.map((msg) => (

                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        currentUserId={currentUserId}
                    />

                ))

            }

            <div ref={bottomRef}></div>

        </div>

    );

}