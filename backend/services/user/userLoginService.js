const bcrypt = require("bcrypt");
const createToken = require("../../utils/generateToken");

const userLoginService = async (Request, Response, DataModel) => {
  let email = Request.body.email;
  let enteredPassword = Request.body.password;

  try {
    let data = await DataModel.aggregate([{ $match: { email: email } }]);

    let token;

    if (data.length > 0) {
      let encrypt = await bcrypt.compare(enteredPassword, data[0].password);
      if (encrypt) {
        if (data.length > 0) {
          token = await createToken(data[0].email, data[0]._id);
        }

        Response.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
          sameSite: "strict",
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
        });

        const { createdAt, updatedAt, password, ...filterData } = data[0];
        return {
          status: "success",
          data: filterData,
        };
      } else {
        return {
          status: "Invalid Credentials",
          data: "invalid email or password",
        };
      }
    } else {
      return {
        status: "Invalid Credentials",
        data: "User not found!",
      };
    }
  } catch (error) {
    console.log("Error from userLoginService", error.message);
    return { status: "fail", data: error.toString() };
  }
};

module.exports = userLoginService;
