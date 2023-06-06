const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const UserService = require("../service/user.service");
const Storage = require('../service/firebase-storage.service')
const isBase64 = require('is-base64');
const jwt = require("jsonwebtoken");

const AuthService = {
  async signUp(user) {
    try {
      let isExist = await UserModel.exists({ email: user.email });
      if (isExist) {
        throw new Error("Email already exist!");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      user.salt = salt;
      if (user.avatar && isBase64(user.avatar,{ allowMime: true })) {
        user.avatar = await Storage.uploadProfilePhoto(user.email ,user.avatar);
      } else {
        // default avatar
        user.avatar = "https://firebasestorage.googleapis.com/v0/b/cupidoor-9a428.appspot.com/o/profiles%2Fdefault.png?alt=media&token=00ade410-04a4-44a5-9b88-615386abf78c&_gl=1*gjdizj*_ga*MTI1MDUwODEwMi4xNjg1OTA0NDkx*_ga_CW55HF8NVT*MTY4NjA3Mzg2MS4yLjEuMTY4NjA3Mzk1Mi4wLjAuMA.."
      }
      const newUser = await UserModel.create(user);
      await newUser.save();
      return newUser;
    } catch (ex) {
      throw new Error("Registration failed: " + ex.message);
    }
  },

  async signIn(email, password, cookies) {
    let user = await UserService.getUserByEmail(email);

    if (!user || !bcrypt.compareSync(password, user?.password)) {
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

    let newRefreshTokenArray = user.refreshToken;

    if (cookies?.jwt) {
      const cookieRefreshToken = cookies.jwt;
      const foundToken = await UserModel.findOne({
        refreshToken: cookieRefreshToken,
      }).exec();
      if (!foundToken) {
        newRefreshTokenArray = [];
      } else {
        newRefreshTokenArray = newRefreshTokenArray.filter(
          (token) => token != cookieRefreshToken
        );
      }
    }

    user.refreshToken = [...newRefreshTokenArray, refreshToken];
    const result = await user.save();

    const {
      password: userPass,
      salt,
      refreshToken: rt,
      ...rest
    } = user.toJSON();

    user = { ...rest };

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
    return await jwt.verify(
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
          const user = await UserModel.findOne(
            { _id: foundUser._id },
            { password: 0, refreshToken: 0, salt: 0 }
          ).exec();
          return { user, newRefreshToken, accessToken };
        }
      }
    );
  },
};

async function _resetRefreshToken(userEmail) {
  const hackedUser = await UserModel.findOne({
    email: userEmail,
  }).exec();
  hackedUser.refreshToken = [];
  return await hackedUser.save();
}

module.exports = AuthService;
