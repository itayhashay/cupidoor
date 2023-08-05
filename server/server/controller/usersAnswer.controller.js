const express = require('express');
const router = express.Router();
const userAnswerService = require('../service/usersAnswer.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

/**
 * @swagger
 * tags:
 *   name: UserAnswer
 *   description: User Answer management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserAnswer:
 *       type: object
 *       required:
 *         - questionId
 *         - user
 *         - value
 *         - priority
 *       properties:
 *         questionId:
 *           type: string
 *           description: ID of the associated question
 *         user:
 *           type: string
 *           description: ID of the associated user
 *         value:
 *           type: string
 *           description: User's answer (can be a string or boolean)
 *         priority:
 *           type: integer
 *           description: Priority of the user's answer
 *       example:
 *         questionId: "6174db8d46878c94a86eb84f"
 *         user: "6174db8d46878c94a86eb850"
 *         value: "Sample answer"
 *         priority: 1
 *     UserAnswer:
 *       type: object
 *       required:
 *         - question
 *         - user
 *         - answer
 *         - priority
 *       properties:
 *         question:
 *           type: string
 *           description: ID of the associated question
 *         user:
 *           type: string
 *           description: ID of the associated user
 *         answer:
 *           type: string
 *           description: User's answer (can be a string or boolean)
 *         priority:
 *           type: integer
 *           description: Priority of the user's answer
 *       example:
 *         question: "6174db8d46878c94a86eb84f"
 *         user: "6174db8d46878c94a86eb850"
 *         answer: "Sample answer"
 *         priority: 1
 */


/**
 * @swagger
 * /user-answer:
 *   get:
 *     summary: Get all user answers for the current user
 *     security:
 *       - bearerAuth: []
 *     tags: [UserAnswer]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAnswer'
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req,res,next) => {
  try {
    const userAnswer = await userAnswerService.getUserAnswer(req.params.id);
    if (!userAnswer) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(userAnswer);
    }
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user-answer/{id}:
 *   get:
 *     summary: Get a user answer by ID
 *     tags: [UserAnswer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user answer to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAnswer'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req,res,next) => {
  try {
    const userAnswers = await userAnswerService.getUserAnswers(req.user);
    res.status(OK).json(userAnswers);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user-answer:
 *   post:
 *     summary: Create a new user answers
 *     tags: [UserAnswer]
 *     security:
 *       - bearerAuth: []
  *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CreateUserAnswer'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAnswer'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req, res,next) => {
  try {
    const userAnswer = await userAnswerService.createUserAnswer(req.body,req.user);
    res.status(CREATED).json(userAnswer);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user-answer/{id}:
 *   put:
 *     summary: Update a user answer by ID
 *     tags: [UserAnswer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user answer to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAnswer'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAnswer'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req,res,next) => {
  try {
    const userAnswer = await userAnswerService.updateUserAnswer(req.params.id, req.body);
    res.status(OK).json(userAnswer);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user-answer/{id}:
 *   delete:
 *     summary: Delete a user answer by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [UserAnswer]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user answer to delete
 *     responses:
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req,res,next) => {
  try {
    await userAnswerService.deleteUserAnswer(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;