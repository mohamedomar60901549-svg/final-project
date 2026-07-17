import NotificationBadge from "./NotificationBadge";

export default function ChatSidebar({
    title = "Conversations",
    users = [],
    selectedUser = null,
    onlineUsers = [],
    notifications = {},
    onSelectUser,
}) {
    return (
        <div className="w-80 bg-white border-r flex flex-col">

            {/* Header */}
            <div className="p-5 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                    {title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {users.length} conversation
                    {users.length !== 1 ? "s" : ""}
                </p>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">

                {users.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No conversations found.
                    </div>
                ) : (
                    users.map((user) => {
                        const selected =
                            selectedUser?.id === user.id;

                        const online =
                            onlineUsers.includes(user.id);

                        return (
                            <button
                                key={user.id}
                                onClick={() =>
                                    onSelectUser(user)
                                }
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-5
                                    py-4
                                    border-b
                                    transition
                                    duration-200
                                    hover:bg-gray-50

                                    ${
                                        selected
                                            ? "bg-red-50 border-l-4 border-l-red-600"
                                            : ""
                                    }
                                `}
                            >
                                {/* Left */}
                                <div className="flex items-center gap-3">

                                    {/* Avatar */}
                                    <div className="relative">

                                        <div
                                            className="
                                                w-11
                                                h-11
                                                rounded-full
                                                bg-red-600
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                font-bold
                                                uppercase
                                            "
                                        >
                                            {user.full_name
                                                ?.charAt(0)}
                                        </div>

                                        <span
                                            className={`
                                                absolute
                                                bottom-0
                                                right-0
                                                w-3
                                                h-3
                                                rounded-full
                                                border-2
                                                border-white
                                                ${
                                                    online
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                }
                                            `}
                                        />
                                    </div>

                                    {/* User Info */}
                                    <div className="text-left">

                                        <h3 className="font-semibold text-gray-800">
                                            {user.full_name}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            {user.role}
                                        </p>

                                    </div>

                                </div>

                                {/* Right */}
                                <NotificationBadge
                                    count={
                                        notifications[user.id] || 0
                                    }
                                />

                            </button>
                        );
                    })
                )}

            </div>

        </div>
    );
}