const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { validateUserSignUp } = require('../validator/auth.validator');


 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description: The Authentication API
  */

 /**
  * @swagger
  * security:
  *  - bearerAuth: []
  * components:
  *     securitySchemes:
  *         bearerAuth:
  *             type: http
  *             scheme: bearer
  *             bearerFormat: JWT
  */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         email: 'bob@gmail.com'
 *         password: '123456'
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - age
 *         - phone
 *         - email
 *         - password
 *         - avatar
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user first name
 *         lastName:
 *           type: string
 *           description: The user last name
 *         phone:
 *           type: string
 *           description: The user phone
 *         age:
 *           type: number
 *           description: The user age
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         avatar:
 *           type: string
 *           description: The user image in base64
 *       example:
 *         firstName: 'bob'
 *         lastName: 'johnson'
 *         age: 27
 *         phone: '123456676'
 *         email: 'bob@gmail.com'
 *         password: '123456'
 *         avatar: 'ENTER YOUR BASE64 IMAGE'
 *     Tokens:
 *       type: object
 *       required:
 *         - accessToken
 *         - refreshToken
 *       properties:
 *         accessToken:
 *           type: string
 *           description: The JWT access token
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: referenced user
 *       example:
 *         accessToken: '123cd123x1xx1'
 *         user:
 *           firstName: 'bob'
 *           lastName: 'johnson'
 *           age: 27
 *           phone: '123456676'
 *           email: 'bob@gmail.com'
 *           password: '123456'
 *           avatar: 'ENTER YOUR BASE64 IMAGE'
 */

/**
* @swagger
* /signUp:
*   post:
*       summary: registers a new user
*       tags: [Auth]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*/

router.post('/signUp', [validateUserSignUp], AuthController.signUp);

/**
 * @swagger
 * /signIn:
 *   post:
 *     summary: Registers a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: The access & refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tokens'
 */
router.post('/signIn', AuthController.signIn);

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Refresh token handled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 */
router.get('/refresh', AuthController.refreshToken);

/**
 * @swagger
 * /signOut:
 *   get:
 *     summary: Logout a user
 *     tags: [Auth]
 *     description: Need to provide the refresh token in the auth header
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout completed successfully
 */
router.get('/signOut', AuthController.signOut);

module.exports = router
