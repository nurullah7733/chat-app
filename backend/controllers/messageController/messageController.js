const mongoose = require("mongoose");
const messageModel = require("../../models/message/messageModel");
const conversationModel = require("../../models/conversation/conversationModel");

exports.sendMessage = async (req, res) => {
  const senderId = req.headers.userId;
  const receiverId = req.params.id;
  try {
    let conversation = await conversationModel.findOne({
      perticipants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [{ senderId, receiverId }],
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
      const validSenderId = new mongoose.Types.ObjectId(senderId);
      const validReceiverId = new mongoose.Types.ObjectId(receiverId);
      const conversation = await conversationModel.aggregate([
        {
          $match: {
            $and: [
              {
                "participants.senderId": validSenderId,
              },
              {
                "participants.receiverId": validReceiverId,
              },
            ],
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
