const bcrypt = require("bcrypt");
const createToken = require("../../utils/generateToken");
const createUserService = async (Request, Response, DataModel) => {
  let reqBody = Request.body;
  let userRowPassword = Request.body.password;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userRowPassword, salt);
    reqBody.password = hashPassword;
    let data = await DataModel.create(reqBody);
    // generate token
    const token = await createToken(data.email, data._id);
    // set cookies
    Response.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
    });
    const { createdAt, updatedAt, password, ...filterData } = data.toObject();

    return { status: "success", data: filterData };
  } catch (error) {
    console.log("Error from createUserService", error.message);
    return { status: "fail", data: error };
  }
};

module.exports = createUserService;
