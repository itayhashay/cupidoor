const express = require('express');
const router = express.Router();
const userAnswerService = require('../service/usersAnswer.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

router.get('/:id', async (req, res) => {
  try {
    const userAnswer = await userAnswerService.getUserAnswer(req.params.id);
    if (!userAnswer) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(userAnswer);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const userAnswers = await userAnswerService.getUserAnswers();
    res.status(OK).json(userAnswers);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const userAnswer = await userAnswerService.createUserAnswer(req.body);
    res.status(CREATED).json(userAnswer);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userAnswer = await userAnswerService.updateUserAnswer(req.params.id, req.body);
    res.status(OK).json(userAnswer);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await userAnswerService.deleteUserAnswer(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;