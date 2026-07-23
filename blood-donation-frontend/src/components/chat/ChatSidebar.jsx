import NotificationBadge from "./NotificationBadge";
import { Search, Users, MessageCircle, User, Heart, Shield } from "lucide-react";

export default function ChatSidebar({
    title = "Conversations",
    users = [],
    selectedUser = null,
    onlineUsers = [],
    notifications = {},
    onSelectUser,
}) {
    // Get role icon
    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return <Shield className="size-3 text-purple-500" />;
            case 'donor':
                return <Heart className="size-3 text-red-500" />;
            case 'patient':
                return <User className="size-3 text-blue-500" />;
            default:
                return <User className="size-3 text-gray-500" />;
        }
    };

    // Get role color
    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return "bg-purple-100 text-purple-700";
            case 'donor':
                return "bg-red-100 text-red-700";
            case 'patient':
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="w-72 md:w-80 bg-white border-r border-border flex flex-col h-full">
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-border bg-gradient-to-r from-red-50 to-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
                            <MessageCircle className="size-5 text-red-600" />
                            {title}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {users.length} conversation
                            {users.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="size-8 md:size-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <Users className="size-4 md:size-4.5" />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-3 md:p-4 border-b border-border">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 md:size-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-9 pr-3 md:pr-4 py-1.5 md:py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600/40 transition"
                    />
                </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto">
                {users.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <MessageCircle className="size-12 text-muted-foreground opacity-30 mb-3" />
                        <p className="text-sm text-muted-foreground">No conversations found.</p>
                        <p className="text-xs text-muted-foreground mt-1">Start a new conversation</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {users.map((user) => {
                            const selected = selectedUser?.id === user.id;
                            const online = onlineUsers.includes(user.id);
                            const unreadCount = notifications[user.id] || 0;

                            return (
                                <button
                                    key={user.id}
                                    onClick={() => onSelectUser(user)}
                                    className={`
                                        w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4
                                        transition duration-200 hover:bg-slate-50
                                        ${selected ? "bg-red-50 border-l-4 border-l-red-600" : "border-l-4 border-l-transparent"}
                                    `}
                                >
                                    {/* Left - User Info */}
                                    <div className="flex items-center gap-3 min-w-0 flex-1">
                                        {/* Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <div
                                                className={`
                                                    w-10 h-10 md:w-11 md:h-11 rounded-full
                                                    flex items-center justify-center font-bold uppercase text-sm md:text-base
                                                    ${selected ? "bg-red-600 text-white" : "bg-red-100 text-red-600"}
                                                `}
                                            >
                                                {user.full_name?.charAt(0) || "?"}
                                            </div>

                                            {/* Online Status Dot */}
                                            <span
                                                className={`
                                                    absolute bottom-0 right-0
                                                    w-2.5 h-2.5 md:w-3 md:h-3 rounded-full
                                                    border-2 border-white
                                                    ${online ? "bg-green-500" : "bg-gray-400"}
                                                `}
                                            />
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-semibold text-foreground text-sm truncate">
                                                    {user.full_name || "Unknown User"}
                                                </h3>
                                                {getRoleIcon(user.role)}
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getRoleColor(user.role)}`}>
                                                    {user.role || "User"}
                                                </span>
                                                {online && (
                                                    <span className="text-[10px] text-green-600 flex items-center gap-1">
                                                        <span className="size-1 rounded-full bg-green-600 animate-pulse" />
                                                        Online
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Notification Badge */}
                                    <div className="flex-shrink-0 ml-2">
                                        <NotificationBadge count={unreadCount} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer - Online Users Count */}
            {users.length > 0 && (
                <div className="p-3 md:p-4 border-t border-border bg-slate-50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-green-500" />
                            <span>{onlineUsers.length} online</span>
                        </div>
                        <span>{users.length} total</span>
                    </div>
                </div>
            )}
        </div>
    );
}