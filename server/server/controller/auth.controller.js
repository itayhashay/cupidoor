const express = require("express");
const router = express.Router();
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
      res.status(INTERNAL_SERVER_ERROR).json({ error: ex.message });
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
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(OK).json({ accessToken, user });
    } catch (ex) {
      res.status(INTERNAL_SERVER_ERROR).json({ error: ex.message });
    }
  },
  async signOut(req, res, next) {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204);
      const refreshToken = cookies.jwt;
      await AuthService.signOut();
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    } catch (ex) {}
  },

  async refreshToken(req, res, next) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send();
    const refreshToken = cookies.jwt;

    try {

      const { newRefreshToken, accessToken } =
        await AuthService.handleRefreshToken(refreshToken);
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 100,
      });
      return res.json({ accessToken });
    } catch (ex) {
      return res.status(401).json({ success: false, error: ex.message });
    }
  },
};

module.exports = AuthController;
