const jwt = require("jsonwebtoken");
const UserService = require("../service/user.service");
const chalk = require("chalk");
const verifyToken = async function (req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders) {
    return res.status(403).json({ error: "Authorization header not found!" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await UserService.getUser(decodedToken.id);
    if(!user){
      console.log(chalk.yellow("Chat Error: User not found!"));
      console.log(chalk.yellow("Chat Error: Token: ") + decodedToken+"\n" + token);
      return res.status(403).json({ error: "Not Authorized!" });
    }
    req.user = user;
    next();
  } catch (ex) {
    console.log(chalk.yellow("Invalid token!"));
    return res.status(403).json({ error: "Invalid token!" });
  }
};

module.exports = verifyToken;
