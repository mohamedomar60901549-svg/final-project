import { io } from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:5000";

const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    timeout: 20000,
});

socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
    console.log("❌ Socket Disconnected:", reason);
});

socket.on("connect_error", (error) => {
    console.error("❌ Socket Error:", error.message);
});

export default socket;