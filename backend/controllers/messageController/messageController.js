const mongoose = require("mongoose");
const messageModel = require("../../models/message/messageModel");
const conversationModel = require("../../models/conversation/conversationModel");
const { getReceiverSocketId, getIO } = require("../../socket/socket");

exports.sendMessage = async (req, res) => {
  const io = getIO();
  const senderId = req.headers.userId;
  const receiverId = req.params.id;

  try {
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const message = await messageModel.create({
      senderId,
      receiverId,
      message: req.body.message,
    });

    await conversation.updateOne({
      $push: { messages: message._id },
    });

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json({ status: "success", data: message });
  } catch (error) {
    console.log("Error from sendMessage controller", error.message);
    res.status(400).json({ status: "fail", data: error });
  }
};

exports.getMessages = async (req, res) => {
  const senderId = req.headers.userId;
  const receiverId = req.params.id;

  try {
    if (
      mongoose.Types.ObjectId.isValid(senderId) &&
      mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      const conversation = await conversationModel.aggregate([
        {
          $match: {
            participants: {
              $all: [
                new mongoose.Types.ObjectId(senderId),
                new mongoose.Types.ObjectId(receiverId),
              ],
            },
          },
        },

        {
          $lookup: {
            from: "messages",
            localField: "messages",
            foreignField: "_id",
            as: "message",
          },
        },
        {
          $unwind: "$message",
        },

        { $sort: { "message.createdAt": 1 } },
        { $group: { _id: "$_id", message: { $push: "$message" } } },

        {
          $lookup: {
            from: "users",
            let: { receiverId: new mongoose.Types.ObjectId(receiverId) },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$receiverId"] } } },
              { $project: { password: 0 } },
            ],
            as: "receiverInfo",
          },
        },
      ]);

      res.status(200).json({ status: "success", data: conversation });
    } else {
      return res.status(400).json({ status: "fail", data: "Invalid Id" });
    }
  } catch (error) {
    console.log("Error from getMessages controller", error.message);
    res.status(400).json({ status: "fail", data: error });
  }
};
