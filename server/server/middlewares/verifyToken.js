const jwt = require("jsonwebtoken");
const UserService = require("../service/user.service");
module.exports = async function (req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(401).json({ error: "Authorization header not found!" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, "mySecret");
    req.user = await UserService.getUserByEmail(decodedToken.email);
    next();
  } catch (ex) {
    return res.status(401).json({ error: "Invalid token!" });
  }
};