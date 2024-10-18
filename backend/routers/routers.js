const router = require("express").Router();

// auth routes
router.use("/auth", require("./authRouter"));
router.use("/messages", require("./messagesRouter"));
router.use("/users", require("./usersRouter"));

module.exports = router;
