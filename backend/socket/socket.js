const { Server } = require("socket.io");
const messageModel = require("../models/message/messageModel");
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

    // seen message
    socket.on("messagesSeen", async ({ senderId, receiverId }) => {
      // Check if the message has already been handled (backend mess loop problem fix)
      const messageKey = `${senderId}-${receiverId}`;
      if (socket.handledMessages && socket.handledMessages.has(messageKey)) {
        return;
      }

      if (!socket.handledMessages) {
        socket.handledMessages = new Set();
      }
      socket.handledMessages.add(messageKey);

      console.log("messagesSeen", senderId, receiverId);
      try {
        await messageModel.updateMany(
          { senderId, receiverId, seen: false },
          { $set: { seen: true } }
        );

        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("messagesSeen", { senderId, receiverId });
        }
      } catch (error) {
        console.error("Error marking messages as seen:", error);
      }

      setTimeout(() => socket.handledMessages.delete(messageKey), 3000);
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
  console.log("message", message);
  const sanitizedMessage = {
    _id: message._id,
    senderId: message.senderId,
    receiverId: message.receiverId,
    message: message.message,
    createdAt: message.createdAt,
    updatedAt: message.updatedAt,
    seen: message.seen,
    shouldShake: true,
  };

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", sanitizedMessage);
  }
};

module.exports = {
  initializeSocket,
  getReceiverSocketId,
  getIO,
  sendMessageToReceiver,
};
