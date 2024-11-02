const { Server } = require("socket.io");
let io;
const userSocketMap = {};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
    },
  });

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

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  getIO,
};
