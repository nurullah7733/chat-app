const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
        receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, required: true, default: [] },
    ],
  },
  { timestamps: true, versionKey: false }
);
const conversationModel = mongoose.model("conversations", conversationSchema);
module.exports = conversationModel;
