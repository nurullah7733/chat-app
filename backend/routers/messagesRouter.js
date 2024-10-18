const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messageController/messageController");
const verifyAuthMiddleware = require("../middlewares/verifyAuthMiddleware/verifyAuthMiddleware");

router.post(
  "/send-message/:id",
  verifyAuthMiddleware,
  messagesController.sendMessage
);
router.get(
  "/get-all-message/:id",
  verifyAuthMiddleware,
  messagesController.getMessages
);

module.exports = router;
