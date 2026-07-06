import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

export default function ConversationList({ token, onSelect }) {

  const [conversations, setConversations] = useState([]);

  const loadConversations = async () => {
    const res = await axios.get(
      "http://127.0.0.1:5000/api/chat/conversations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setConversations(res.data);
  };

  useEffect(() => {
    loadConversations();

    // REAL-TIME UPDATE
    socket.on("receive_message", () => {
      loadConversations();
    });

    socket.on("message_sent", () => {
      loadConversations();
    });

  }, []);

  return (
    <div className="sidebar">
      <h3>Inbox</h3>

      {conversations.map((c) => (
        <div
          key={c.id}
          className="conversation-item"
          onClick={() => onSelect(c)}
        >
          <div>
            <p>User #{c.user_id}</p>
            <small>{c.last_message}</small>
          </div>

          {c.unread_count > 0 && (
            <span className="badge">{c.unread_count}</span>
          )}
        </div>
      ))}
    </div>
  );
}