const userModel = require("../../models/user/userModel");

exports.getUsers = async (req, res) => {
  const userId = req.headers.userId;
  try {
    const filterUsers = await userModel.find({ _id: { $ne: userId } });
    return res.status(200).json({ status: "success", data: filterUsers });
  } catch (error) {
    return res.status(400).json({ status: "fail", data: error });
  }
};
