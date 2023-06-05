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
    let user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new Error("Email or password are invalid!");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Email or password are invalid!");
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!user.refreshToken) {
      user.refreshToken.push(refreshToken);
      await user.save();
    }

    user = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      age: user.age,
      phone: user.phone,
      role: user.role,
      description: user.description,
      isSmoking: user.isSmoking,
      hasPets: user.hasPets,
      create: user.createdAt,
    };

    return { accessToken, refreshToken, user };
  },
  async signOut(refreshToken) {
    const user = await UserModel.findOne({ refreshToken }).exec();
    if (!user) {
      return true;
    }
    user.refreshToken = user.refreshToken.filter(
      (token) => token != refreshToken
    );
    await user.save();
    return true;
  },
  async handleRefreshToken(refreshToken) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        const foundUser = await UserModel.findOne({ refreshToken }).exec();

        //If we didn't find the user, the token might be hacked.
        if (!foundUser) {
          await _resetRefreshToken(decoded.email);
          throw new Error("Unauthorized");
        } else {
          const newRefreshTokenArray = foundUser.refreshToken.filter(
            (token) => token !== refreshToken
          );

          if (err) {
            foundUser.refreshToken = [...newRefreshTokenArray];
            await foundUser.save();
            throw new Error("Unauthorized!");
          }

          const accessToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
          );

          const newRefreshToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.REFRESH_TOKEN_SECRET
          );

          foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
          await foundUser.save();
          return { newRefreshToken, accessToken };
        }
      }
    );
  },
};

async function _resetRefreshToken(userEmail) {
  const hackedUser = await UserModel.findOne({
    email: decoded.email,
  }).exec();
  hackedUser.refreshToken = [];
  return await hackedUser.save();
}

module.exports = AuthService;
