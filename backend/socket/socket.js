const { Server } = require("socket.io");
let io;
const userSocketMap = {};

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      // eslint-disable-next-line no-undef
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
      userSocketMap[userId] = socket.id;
    }

    // online users
    io.emit("onlineUsers", Object.keys(userSocketMap));

    //  TypingStatus
    socket.on("typing", (receiverId) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", receiverId);
        console.log("typing", receiverId);
      }
    });

    socket.on("stopTyping", (receiverId) => {
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stopTyping", receiverId);
        console.log("stopTyping", receiverId);
      }
    });

    // disconnection
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

// send message to receiverId
const sendMessageToReceiver = (receiverId, message) => {
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", message);
  }
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  getIO,
  sendMessageToReceiver,
};
