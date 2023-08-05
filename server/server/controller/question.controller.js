const express = require("express");
const router = express.Router();
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("http-status-codes");
const questionService = require("../service/question.service");

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - questionName
 *         - tenant
 *         - landlord
 *       properties:
 *         questionName:
 *           type: string
 *         tenant:
 *           type: string
 *         landlord:
 *           type: string
 *       example:
 *         questionName: "Sample Question"
 *         tenant: "Question for tenant?"
 *         landlord: "Question for landlord?"
 */


/**
 * @swagger
 * /question:
 *   post:
 *     summary: Create a new question
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal Server Error
 */
router.post("/", async (req,res,next) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(CREATED).json(question);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /question:
 *   get:
 *     summary: Get all questions
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req,res,next) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(OK).json(questions);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /question/{id}:
 *   get:
 *     summary: Get a question by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", async (req,res,next) => {
  try {
    const question = await questionService.getQuestion(req.params.id);
    if (!question) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(question);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     summary: Update a question by ID
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", async (req,res,next) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(
      req.params.id,
      req.body
    );
    res.status(OK).json(updatedQuestion);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Question]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the question to delete
 *     responses:
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 */

router.delete("/:id", async (req,res,next) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
