import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";

export default function ChatWindow({
  conversationId,
  receiverId,
  token,
  messages,
  setMessages
}) {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("send_message", {
      token,
      conversation_id: conversationId,
      receiver_id: receiverId,
      message: text
    });

    setText("");
  };

  // SOCKET LISTENERS (IMPORTANT FIX)
  useEffect(() => {
    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleSent = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleReceive);
    socket.on("message_sent", handleSent);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("message_sent", handleSent);
    };
  }, [setMessages]);

  return (
    <div className="chat-box">

      {/* MESSAGES */}
      <div className="messages">

        {messages.length === 0 && (
          <p style={{ textAlign: "center", color: "gray" }}>
            No messages yet
          </p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`msg ${m.sender_id === receiverId ? "left" : "right"}`}
          >
            <p>{m.message}</p>

            <small>
              {m.delivered ? "✓" : ""}
              {m.is_read ? "✓" : ""}
            </small>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* INPUT */}
      <div className="input-box">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}