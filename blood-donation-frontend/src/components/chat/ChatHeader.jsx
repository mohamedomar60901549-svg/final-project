export default function ChatHeader({
    title,
    subtitle = "",
    online = false,
    avatar = "💬",
    actions = null,
}) {
    return (
        <div className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">

            {/* Left Side */}
            <div className="flex items-center gap-4">

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold">
                    {avatar}
                </div>

                {/* User Info */}
                <div>

                    <h2 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h2>

                    <div className="flex items-center gap-2 text-sm">

                        <span
                            className={`w-2.5 h-2.5 rounded-full ${
                                online
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                            }`}
                        />

                        <span
                            className={
                                online
                                    ? "text-green-600"
                                    : "text-gray-500"
                            }
                        >
                            {online ? "Online" : "Offline"}
                        </span>

                        {subtitle && (
                            <>
                                <span className="text-gray-300">•</span>

                                <span className="text-gray-500">
                                    {subtitle}
                                </span>
                            </>
                        )}
                    </div>

                </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                {actions}
            </div>

        </div>
    );
}