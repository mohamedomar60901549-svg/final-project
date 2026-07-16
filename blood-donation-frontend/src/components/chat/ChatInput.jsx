import { useEffect, useRef } from "react";

export default function ChatInput({

    value,

    onChange,

    onSend,

    onTyping,

    disabled = false

}) {

    const inputRef = useRef(null);

    // =====================================
    // ALWAYS KEEP INPUT FOCUSED
    // =====================================

    useEffect(() => {

        inputRef.current?.focus();

    });

    // =====================================
    // ENTER TO SEND
    // =====================================

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            onSend();

        }

    };

    // =====================================
    // CHANGE
    // =====================================

    const handleChange = (e) => {

        onChange(e.target.value);

        if (onTyping) {

            onTyping();

        }

    };

    return (

        <div className="bg-white border-t p-4">

            <div className="flex items-center gap-3">

                <input

                    ref={inputRef}

                    type="text"

                    value={value}

                    disabled={disabled}

                    onChange={handleChange}

                    onKeyDown={handleKeyDown}

                    placeholder="Type a message..."

                    className="
                        flex-1
                        border
                        rounded-full
                        px-5
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-red-500
                    "

                />

                <button

                    onClick={onSend}

                    disabled={disabled || value.trim() === ""}

                    className="
                        px-6
                        py-3
                        rounded-full
                        bg-red-600
                        hover:bg-red-700
                        disabled:bg-gray-400
                        text-white
                        font-semibold
                        transition
                    "

                >

                    Send

                </button>

            </div>

        </div>

    );

}