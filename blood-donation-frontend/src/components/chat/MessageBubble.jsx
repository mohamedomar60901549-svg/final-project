export default function MessageBubble({ message, currentUserId }) {

    const isMine = message.sender_id === currentUserId;

    const formatTime = (time) => {

        if (!time) return "";

        return new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    };

    return (

        <div
            className={`flex ${
                isMine ? "justify-end" : "justify-start"
            }`}
        >

            <div
                className={`
                    max-w-[70%]
                    px-4
                    py-3
                    rounded-2xl
                    shadow-md
                    break-words
                    ${
                        isMine
                            ? "bg-red-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                    }
                `}
            >

                <p className="whitespace-pre-wrap">
                    {message.message}
                </p>

                <div
                    className={`
                        flex
                        items-center
                        justify-end
                        gap-1
                        mt-2
                        text-[11px]
                        ${
                            isMine
                                ? "text-red-100"
                                : "text-gray-500"
                        }
                    `}
                >

                    <span>

                        {formatTime(message.created_at)}

                    </span>

                    {isMine && (

                        <span>

                            {message.is_read
                                ? "✓✓"
                                : message.delivered
                                ? "✓✓"
                                : "✓"}

                        </span>

                    )}

                </div>

            </div>

        </div>

    );

}