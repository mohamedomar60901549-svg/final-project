import { useEffect, useRef } from "react";

export default function ChatInput({
    value,
    onChange,
    onSend,
    onTyping,
    placeholder = "Type a message...",
    disabled = false,
}) {
    const inputRef = useRef(null);

    // =====================================
    // KEEP INPUT FOCUSED
    // =====================================

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // =====================================
    // SEND MESSAGE
    // =====================================

    const handleSend = () => {
        if (disabled) return;

        if (!value.trim()) return;

        onSend();
    };

    // =====================================
    // INPUT CHANGE
    // =====================================

    const handleChange = (e) => {
        const text = e.target.value;

        onChange(text);

        if (onTyping) {
            onTyping();
        }
    };

    // =====================================
    // ENTER TO SEND
    // SHIFT + ENTER = NEW LINE
    // =====================================

    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-white border-t px-5 py-4">

            <div className="flex items-end gap-3">

                {/* Input */}

                <textarea
                    ref={inputRef}
                    rows={1}
                    value={value}
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="
                        flex-1
                        resize-none
                        rounded-2xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-red-500
                        focus:ring-2
                        focus:ring-red-200
                        disabled:bg-gray-100
                        disabled:cursor-not-allowed
                    "
                />

                {/* Send Button */}

                <button
                    onClick={handleSend}
                    disabled={
                        disabled ||
                        value.trim() === ""
                    }
                    className="
                        flex
                        items-center
                        justify-center
                        w-12
                        h-12
                        rounded-full
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-gray-400
                        disabled:cursor-not-allowed
                        text-white
                        transition
                        duration-200
                    "
                    title="Send Message"
                >
                    ➤
                </button>

            </div>

        </div>
    );
}