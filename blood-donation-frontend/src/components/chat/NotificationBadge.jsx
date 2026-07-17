export default function TypingIndicator({
    userName,
}) {
    if (!userName) return null;

    return (
        <div className="px-5 py-2 bg-gray-100">

            <div className="inline-flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm">

                <span className="text-sm text-gray-600">
                    <strong>{userName}</strong> is typing
                </span>

                <div className="flex items-center gap-1">

                    <span
                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-gray-500
                            animate-bounce
                        "
                    />

                    <span
                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-gray-500
                            animate-bounce
                            [animation-delay:150ms]
                        "
                    />

                    <span
                        className="
                            w-2
                            h-2
                            rounded-full
                            bg-gray-500
                            animate-bounce
                            [animation-delay:300ms]
                        "
                    />

                </div>

            </div>

        </div>
    );
}