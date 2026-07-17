export default function MessageBubble({
    message,
    currentUserId,
}) {
    const isMine = message.sender_id === currentUserId;

    const formatTime = (time) => {
        if (!time) return "";

        const date = new Date(time);

        if (isNaN(date.getTime())) return "";

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const renderStatus = () => {
        if (!isMine) return null;

        if (message.is_read) {
            return (
                <span className="text-blue-200 font-bold">
                    ✓✓
                </span>
            );
        }

        if (message.delivered) {
            return (
                <span className="text-red-100 font-bold">
                    ✓✓
                </span>
            );
        }

        return (
            <span className="text-red-100 font-bold">
                ✓
            </span>
        );
    };

    return (
        <div
            className={`flex mb-3 ${
                isMine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`
                    max-w-[75%]
                    md:max-w-[60%]
                    px-4
                    py-3
                    rounded-2xl
                    shadow
                    break-words
                    transition-all
                    duration-200

                    ${
                        isMine
                            ? "bg-red-600 text-white rounded-br-md"
                            : "bg-white text-gray-800 rounded-bl-md"
                    }
                `}
            >
                {/* Message */}

                <p className="whitespace-pre-wrap leading-relaxed">
                    {message.message}
                </p>

                {/* Footer */}

                <div
                    className={`
                        flex
                        justify-end
                        items-center
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

                    {renderStatus()}
                </div>
            </div>
        </div>
    );
}