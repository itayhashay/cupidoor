const jwt = require("jsonwebtoken");
const UserService = require("../service/user.service");
const verifyToken = async function (req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(403).json({ error: "Authorization header not found!" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await UserService.getUserByEmail(decodedToken.email);
    next();
  } catch (ex) {
    return res.status(403).json({ error: "Invalid token!" });
  }
};

module.exports = verifyToken;
