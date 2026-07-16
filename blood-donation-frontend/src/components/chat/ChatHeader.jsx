export default function ChatHeader({

    selectedUser,

    online = false

}) {

    if (!selectedUser) {

        return (

            <div className="bg-white border-b p-5">

                <h2 className="text-xl font-bold text-gray-700">

                    💬 LifeLink Chat

                </h2>

                <p className="text-gray-500 text-sm">

                    Select a conversation

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white border-b px-6 py-4">

            <div className="flex items-center gap-4">

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
                            text-lg
                            font-bold
                        "
                    >

                        {selectedUser.full_name
                            ?.charAt(0)
                            .toUpperCase()}

                    </div>

                    <span
                        className={`
                            absolute
                            bottom-0
                            right-0
                            w-3.5
                            h-3.5
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

                {/* Name */}

                <div className="flex-1">

                    <h2 className="font-bold text-lg">

                        {selectedUser.full_name}

                    </h2>

                    <p className="text-sm text-gray-500">

                        {online
                            ? "🟢 Online"
                            : "⚪ Offline"}

                    </p>

                </div>

            </div>

        </div>

    );

}