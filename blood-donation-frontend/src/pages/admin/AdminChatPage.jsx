import { useEffect, useState } from "react";
import socket from "../../socket";

export default function AdminChatPage() {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const conversationId = 1; // temporary static (we upgrade later)

  useEffect(() => {

    socket.emit("join_room", {
      conversation_id: conversationId
    });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");

  }, []);

  const sendMessage = () => {

    if (!text.trim()) return;

    const msg = {
      conversation_id: conversationId,
      sender_id: 1, // admin id (temporary)
      message: text
    };

    socket.emit("send_message", msg);

    setMessages((prev) => [...prev, msg]);
    setText("");
  };

  return (
    <div style={{ display: "flex", height: "80vh" }}>

      {/* Inbox */}
      <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        <h3>Inbox</h3>
        <p>Patient 1</p>
        <p>Donor 1</p>
      </div>

      {/* Chat */}
      <div style={{ width: "70%", padding: "10px" }}>

        <div style={{ height: "70vh", overflowY: "auto" }}>
          {messages.map((m, i) => (
            <div key={i}>
              <b>{m.sender_id === 1 ? "Admin" : "User"}:</b> {m.message}
            </div>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>Send</button>

      </div>

    </div>
  );
}