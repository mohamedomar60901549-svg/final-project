export default function ChatSidebar({

    users,

    selectedUser,

    onSelect,

    onlineUsers,

    notifications

}) {

    return (

        <div className="w-80 bg-white border-r flex flex-col">

            <div className="bg-red-600 text-white p-5">

                <h2 className="text-xl font-bold">

                    💬 Chats

                </h2>

            </div>

            <div className="flex-1 overflow-y-auto">

                {

                    users.map((user) => (

                        <div

                            key={user.id}

                            onClick={() => onSelect(user)}

                            className={`

                                flex

                                justify-between

                                items-center

                                p-4

                                cursor-pointer

                                border-b

                                hover:bg-gray-100

                                ${selectedUser?.id === user.id ? "bg-red-50" : ""}

                            `}

                        >

                            <div className="flex items-center gap-3">

                                <div className="relative">

                                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">

                                        {user.full_name.charAt(0).toUpperCase()}

                                    </div>

                                    {

                                        onlineUsers.includes(user.id) && (

                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>

                                        )

                                    }

                                </div>

                                <div>

                                    <h3 className="font-semibold">

                                        {user.full_name}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {user.role}

                                    </p>

                                </div>

                            </div>

                            {

                                notifications[user.id] > 0 && (

                                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">

                                        {notifications[user.id]}

                                    </span>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </div>

    );

}