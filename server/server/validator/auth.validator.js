const { check, body, validationResult } = require('express-validator');
const errorFormatter = require('./errorFormatter');

const validateUserSignUp = [body('email').isEmail().withMessage('Invalid email address!'),
body('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty!'),
body("password").trim().escape().not().isEmpty().withMessage("Password field cannot be empty!"),
body('firstName').trim().escape().not().isEmpty().withMessage('First name cannot be empty!'),
body('lastName').trim().escape().not().isEmpty().withMessage('Last name cannot be empty'),
body('age').trim().escape().not().isEmpty().withMessage('Age cannot be empty'),
body('phone').trim().escape().not().isEmpty().withMessage('Phone number cannot be empty'),
(req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        errors.formatWith(errorFormatter);
        return res.status(422).json({ success: false, error: errors.array() });
    }
    next();
}];


const validateUserChangeDetails = [body('email').isEmail().withMessage('Invalid email address!'),
body('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty!'),
body('firstName').trim().escape().not().isEmpty().withMessage('First name cannot be empty!'),
body('lastName').trim().escape().not().isEmpty().withMessage('Last name cannot be empty'),
(req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        errors.formatWith(errorFormatter);
        return res.status(422).json({ success: false, error: errors.array() });
    }
    next();
}];


const validateUserSignIn = [body('email').isEmail().withMessage('Invalid email address!'),
body('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty!'),
body("password").trim().escape().not().isEmpty().withMessage("Password field cannot be empty!"),
(req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, error: errors.array() });
    }
    next();
}]; ``

const normalizeUserSignUp = [body('email').isEmail().normalizeEmail(),
body('firstName').trim().not().isEmpty().escape(),
body('lastName').trim().not().isEmpty().escape(),
body('phone').trim().not().isEmpty().escape()]


const normalizeUserSignIn = [body('email').isEmail().normalizeEmail()]





module.exports = {
    validateUserSignUp,
    validateUserSignIn,
    normalizeUserSignUp,
    normalizeUserSignIn,
    validateUserChangeDetails
}