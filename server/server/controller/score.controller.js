const express = require('express');
const router = express.Router();
const scoreService = require('../service/score.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

router.get('/', async (req,res,next) => {
  try {
    const scores = await scoreService.getScores();
    res.status(OK).json(scores);
  } catch (err) {
    next(err);
  }
});

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

router.post('/', async (req,res,next) => {
  try {
    const score = await scoreService.createScore(req.body);
    res.status(CREATED).json(score);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req,res,next) => {
  try {
    const score = await scoreService.updateScore(req.params.id, req.body);
    res.status(OK).json(score);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req,res,next) => {
  try {
    await scoreService.deleteScore(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;