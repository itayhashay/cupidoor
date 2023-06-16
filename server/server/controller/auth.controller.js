const AuthService = require("../service/auth.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");
const jwt = require("jsonwebtoken");

const AuthController = {
  async signUp(req, res, next) {
    const userDetails = req.body;
    try {
      res.status(OK).json(await AuthService.signUp(userDetails));
    } catch (ex) {
      next(ex);
    }
  },
  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const { accessToken, refreshToken, user } = await AuthService.signIn(
        email,
        password
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(OK).json({ accessToken, user });
    } catch (ex) {
      next(ex);
    }
  },
  async signOut(req, res, next) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204);
      const refreshToken = cookies.jwt;
      await AuthService.signOut(refreshToken);
      res.clearCookie("jwt");
      res.status(200).json({success:true});
    } catch (ex) {
      next(ex);
    }
  },

  async refreshToken(req, res, next) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send("Refresh token not found");
    const refreshToken = cookies.jwt;

    try {
      const { newRefreshToken, accessToken, user } =
        await AuthService.handleRefreshToken(refreshToken);
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 100,
      });
      return res.json({ user, accessToken });
    } catch (ex) {
      ex.status = 401;
      next(ex);
    }
  },
};

module.exports = AuthController;
