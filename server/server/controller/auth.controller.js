const express = require('express');
const router = express.Router();
const AuthService = require('../service/auth.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');


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
            res.status(OK).json(await AuthService.signIn(email, password));
        } catch (ex) {
            res.status(INTERNAL_SERVER_ERROR).json({ error: ex.message });
        }

    }
}

module.exports = AuthController;