const express = require('express');
const router = express.Router();
const scoreService = require('../service/score.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

/**
 * @swagger
 * tags:
 *   name: Score
 *   description: Score management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Score:
 *       type: object
 *       required:
 *         - tenant
 *         - apartment
 *         - landlord
 *         - score
 *       properties:
 *         tenant:
 *           type: string
 *           description: ID of the tenant
 *         apartment:
 *           type: string
 *           description: ID of the apartment
 *         landlord:
 *           type: string
 *           description: ID of the landlord
 *         score:
 *           type: number
 *           description: Score value
 *       example:
 *         tenant: "6174db8d46878c94a86eb850"
 *         apartment: "6174db8d46878c94a86eb84f"
 *         landlord: "6174db8d46878c94a86eb84e"
 *         score: 4
 */

/**
 * @swagger
 * /score:
 *   get:
 *     summary: Get all scores
 *     tags: [Score]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Score'
 *       500:
 *         description: Internal Server Error
 */

router.get('/', async (req,res,next) => {
  try {
    const scores = await scoreService.getScores();
    res.status(OK).json(scores);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /score/{id}:
 *   get:
 *     summary: Get a score by ID
 *     tags: [Score]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the score to retrieve
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req,res,next) => {
  try {
    const score = await scoreService.getScore(req.params.id);
    if (!score) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(score);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /score:
 *   post:
 *     summary: Create a new score
 *     tags: [Score]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Score'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       500:
 *         description: Internal Server Error
 */
router.post('/', async (req,res,next) => {
  try {
    const score = await scoreService.createScore(req.body);
    res.status(CREATED).json(score);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /score/{id}:
 *   put:
 *     summary: Update a score by ID
 *     tags: [Score]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the score to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Score'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Score'
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', async (req,res,next) => {
  try {
    const score = await scoreService.updateScore(req.params.id, req.body);
    res.status(OK).json(score);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /score/{id}:
 *   delete:
 *     summary: Delete a score by ID
 *     tags: [Score]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the score to delete
 *     responses:
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', async (req,res,next) => {
  try {
    await scoreService.deleteScore(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;