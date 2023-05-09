const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const UserService = require("../service/user.service");
const jwt = require("jsonwebtoken");

const AuthService = {
  async signUp(user) {
    try {
      let isExist = await UserModel.exists({ email: user.email });
      if (isExist) {
        console.log(isExist);
        throw new Error("Email already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      user.salt = salt;
      const newUser = await UserModel.create(user);
      await newUser.save();
      return newUser;
    } catch (ex) {
      throw new Error("Registration failed: " + ex.message);
    }
  },

  async signIn(email, password) {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("Email or password are invalid!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Email or password are invalid!");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "mySecret", {
      expiresIn: "24h",
    });


    return {token};
  },
};

module.exports = AuthService;
