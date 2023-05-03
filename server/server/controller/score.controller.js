const express = require('express');
const router = express.Router();
const scoreService = require('../service/score.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

router.get('/', async (req, res) => {
  try {
    const scores = await scoreService.getScores();
    res.status(OK).json(scores);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const score = await scoreService.getScore(req.params.id);
    if (!score) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(score);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const score = await scoreService.createScore(req.body);
    res.status(CREATED).json(score);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const score = await scoreService.updateScore(req.params.id, req.body);
    res.status(OK).json(score);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await scoreService.deleteScore(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;