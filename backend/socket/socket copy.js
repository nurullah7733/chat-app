require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const app = require("../app");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    const disconnectedUserId = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id
    );

    if (disconnectedUserId) {
      delete userSocketMap[disconnectedUserId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
      console.log("User disconnected:", disconnectedUserId);
    }
  });
});

module.exports = { server, io, getReceiverSocketId };
