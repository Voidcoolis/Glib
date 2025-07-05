import { Server } from "socket.io";
import http from "http"; //it's built into node, so we don't need to install it
import express from "express";

const app = express();
const server = http.createServer(app);

// Initialize Socket.io server with CORS settings (allow frontend origin)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

 //Helper function to get a user's socket ID by their userId for the Message Controller
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Object to map userId to their socketId (tracks online users)
const userSocketMap = {}; // {userId: socketId} userId comes from the database

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Get userId from the connection query and store the mapping
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients(online users)
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
