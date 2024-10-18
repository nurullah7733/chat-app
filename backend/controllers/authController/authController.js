const createService = require("../../services/user/userCreateService");
const userModel = require("../../models/user/userModel");
const userLoginService = require("../../services/user/userLoginService");

exports.register = async (req, res) => {
  let { fullName, email, password, confirmPassword, gender } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !gender) {
    return res
      .status(400)
      .json({ status: "fail", data: "All fields are required" });
  } else if (password.length < 6) {
    return res
      .status(400)
      .json({ status: "fail", data: "password must be at least 6 characters" });
  } else if (password !== confirmPassword) {
    return res.status(400).json({ status: "fail", data: "password not match" });
  } else {
    let maleProfilePicture = `https://avatar.iran.liara.run/public/boy/?username=${fullName}`;
    let femaleProfilePicture = `https://avatar.iran.liara.run/public/girl/?username=${fullName}`;

    if (gender == "male") {
      req.body["profilePicture"] = maleProfilePicture;
    } else {
      req.body["profilePicture"] = femaleProfilePicture;
    }

    const data = await createService(req, res, userModel);

    if (data.status == "success") {
      return res.status(201).json(data);
    } else {
      return res.status(400).json(data);
    }
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "fail", data: "All fields are required" });
  } else {
    const data = await userLoginService(req, res, userModel);
    if (data.status === "success") {
      return res.status(200).json(data);
    } else {
      return res.status(400).json(data);
    }
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ status: "success", data: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error from logout controller", error.message);
    res.status(400).json({ status: "fail", data: error });
  }
};
