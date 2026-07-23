import { User, Phone, Video, MoreVertical, Shield, Heart, MessageCircle, Mail, MapPin } from "lucide-react";

export default function ChatHeader({
    title,
    subtitle = "",
    online = false,
    avatar = "💬",
    actions = null,
    role = "",
    location = "",
    onVoiceCall,
    onVideoCall,
    onMoreOptions,
}) {
    // Get role icon
    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return <Shield className="size-3.5 text-purple-500" />;
            case 'donor':
                return <Heart className="size-3.5 text-red-500" />;
            case 'patient':
                return <User className="size-3.5 text-blue-500" />;
            default:
                return <User className="size-3.5 text-gray-500" />;
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
        <div className="bg-white border-b border-border shadow-sm px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            {/* Left Side - User Info */}
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center text-lg md:text-xl font-bold">
                        {avatar}
                    </div>
                    {online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white animate-pulse" />
                    )}
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base md:text-lg font-semibold text-foreground truncate">
                            {title}
                        </h2>
                        {role && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                                {getRoleIcon(role)}
                                {role}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${online ? "bg-green-500" : "bg-gray-400"}`} />
                            <span className={online ? "text-green-600 font-medium" : "text-muted-foreground"}>
                                {online ? "Online" : "Offline"}
                            </span>
                        </div>

                        {subtitle && (
                            <>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">{subtitle}</span>
                            </>
                        )}

                        {location && (
                            <>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="size-3" />
                                    {location}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* Voice Call */}
                {onVoiceCall && (
                    <button
                        onClick={onVoiceCall}
                        className="p-2 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground transition"
                        title="Voice Call"
                    >
                        <Phone className="size-4 md:size-5" />
                    </button>
                )}

                {/* Video Call */}
                {onVideoCall && (
                    <button
                        onClick={onVideoCall}
                        className="p-2 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground transition"
                        title="Video Call"
                    >
                        <Video className="size-4 md:size-5" />
                    </button>
                )}

                {/* Custom Actions */}
                {actions && (
                    <div className="flex items-center gap-1 md:gap-2">
                        {actions}
                    </div>
                )}

                {/* More Options */}
                {onMoreOptions && (
                    <button
                        onClick={onMoreOptions}
                        className="p-2 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground transition"
                        title="More Options"
                    >
                        <MoreVertical className="size-4 md:size-5" />
                    </button>
                )}
            </div>
        </div>
    );
}