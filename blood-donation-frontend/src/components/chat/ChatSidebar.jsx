import NotificationBadge from "./NotificationBadge";

export default function ChatSidebar({
    users = [],
    selectedUser,
    notifications = {},
    onlineUsers = [],
    onSelect
}) {

    return (

        <div className="w-80 bg-white border-r flex flex-col">

            {/* ================= HEADER ================= */}

            <div className="bg-red-600 text-white px-6 py-5">
                <h2 className="text-xl font-bold">
                    💬 Chats
                </h2>

                <p className="text-sm text-red-100">
                    LifeLink Messaging
                </p>
            </div>

            {/* ================= USERS ================= */}

            <div className="flex-1 overflow-y-auto">

                {users.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No conversations found
                    </div>
                )}

                {users.map((u) => {

                    const online = onlineUsers.includes(u.id);

                    const active =
                        selectedUser?.id === u.id;

                    return (

                        <button
                            key={u.id}
                            onClick={() => onSelect(u)}
                            className={`
                                w-full
                                flex
                                items-center
                                justify-between
                                px-5
                                py-4
                                border-b
                                hover:bg-gray-100
                                transition
                                ${
                                    active
                                        ? "bg-red-50"
                                        : "bg-white"
                                }
                            `}
                        >

                            <div className="flex items-center gap-3">

                                {/* Avatar */}

                                <div className="relative">

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-full
                                            bg-red-600
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                        "
                                    >
                                        {u.full_name
                                            .charAt(0)
                                            .toUpperCase()}
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
                                    ></span>

                                </div>

                                {/* User Info */}

                                <div className="text-left">

                                    <h3 className="font-semibold">
                                        {u.full_name}
                                    </h3>

                                    <p className="text-xs text-gray-500 capitalize">
                                        {u.role}
                                    </p>

                                </div>

                            </div>

                            {/* Notification Badge */}

                            <NotificationBadge
                                count={notifications[u.id] || 0}
                            />

                        </button>

                    );

                })}

            </div>

        </div>

    );

}