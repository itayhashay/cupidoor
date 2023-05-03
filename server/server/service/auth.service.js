const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const UserService = require("../service/user.service");
const AuthService = {
  async signUp(user) {
    let isExist = await UserModel.exists({ email: user.email });
    if (isExist) {
      console.log(isExist);
      throw new Error("Email already exist!");
    }
    let newUser;
    await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          if (err) throw err;
          user.name = `${user.firstName} ${user.lastName}`;
          user.firstName = user.firstName;
          user.lastName = user.lastName;
          user.email = user.email;
          user.age = user.age;
          user.role = user.role;
          user.password = hash;
          user.salt = salt;
          newUser = await UserModel.create(user);
          resolve();
        });
      });
    });
    return await newUser.save();
  },

  async signIn(email, password) {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("Email or password are invalid!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Email or password are invalid!");
    }
    return user;
  },
};

module.exports = AuthService;
