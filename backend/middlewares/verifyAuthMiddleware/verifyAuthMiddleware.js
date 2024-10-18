const jwt = require("jsonwebtoken");

const verifyAuthMiddleware = (req, res, next) => {
  let token = req.cookies.token;
  // eslint-disable-next-line no-undef
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({ status: "unauthorized" });
    } else {
      let data = decoded.data.split(" ");
      req.headers.email = data[0];
      req.headers.userId = data[1];

      next();
    }
  });
};

module.exports = verifyAuthMiddleware;
