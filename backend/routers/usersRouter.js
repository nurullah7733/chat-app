const router = require("express").Router();
const usersController = require("../controllers/userController/userController");
const verifyAuthMiddleware = require("../middlewares/verifyAuthMiddleware/verifyAuthMiddleware");

router.get("/get-all-users", verifyAuthMiddleware, usersController.getUsers);

module.exports = router;
