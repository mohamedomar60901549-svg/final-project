import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000", {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
});

socket.on("connect", () => {
    console.log("✅ Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected");
});

export default socket;