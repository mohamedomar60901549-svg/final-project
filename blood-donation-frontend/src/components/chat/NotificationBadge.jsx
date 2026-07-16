export default function NotificationBadge({ count }) {
    if (!count || count <= 0) return null;

    return (
        <span
            className="
                min-w-[22px]
                h-[22px]
                px-2
                rounded-full
                bg-red-600
                text-white
                text-xs
                font-bold
                flex
                items-center
                justify-center
            "
        >
            {count > 99 ? "99+" : count}
        </span>
    );
}