import { useRef } from "react";

export default function ChatInput({

    value,

    setValue,

    onSend,

    onTyping

}) {

    const inputRef = useRef(null);

    const send = () => {

        if (!value.trim()) return;

        onSend();

        setTimeout(() => {

            inputRef.current?.focus();

        }, 0);

    };

    const handleChange = (e) => {

        setValue(e.target.value);

        if (onTyping) {

            onTyping();

        }

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            send();

        }

    };

    return (

        <div className="bg-white border-t p-4 flex gap-3">

            <input

                ref={inputRef}

                autoFocus

                type="text"

                value={value}

                onChange={handleChange}

                onKeyDown={handleKeyDown}

                placeholder="Type a message..."

                className="flex-1 border rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-red-500"

            />

            <button

                onClick={send}

                className="bg-red-600 hover:bg-red-700 text-white px-6 rounded-full font-semibold"

            >

                Send

            </button>

        </div>

    );

}