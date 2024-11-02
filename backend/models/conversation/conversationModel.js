const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    ],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "messages", default: [] },
    ],
  },
  { timestamps: true, versionKey: false }
);
const conversationModel = mongoose.model("conversations", conversationSchema);
module.exports = conversationModel;
