export default function MessageBubble({ message, currentUserId }) {
    const mine = message.sender_id === currentUserId;

    const time = message.created_at
        ? new Date(message.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    return (
        <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow ${
                    mine
                        ? "bg-red-600 text-white rounded-br-none"
                        : "bg-white rounded-bl-none"
                }`}
            >
                <p className="break-words">{message.message}</p>

                <div className="flex justify-end items-center gap-1 mt-2 text-xs opacity-80">
                    <span>{time}</span>

                    {mine && (
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