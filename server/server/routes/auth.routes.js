const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { validateUserSignUp } = require('../validator/auth.validator');


router.post('/signUp',[validateUserSignUp], AuthController.signUp);
router.post('/signIn', AuthController.signIn);

module.exports = router