const express = require('express');
const router = express.Router();
const userAnswerService = require('../service/usersAnswer.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

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

router.get('/', async (req,res,next) => {
  try {
    const userAnswers = await userAnswerService.getUserAnswers(req.user);
    res.status(OK).json(userAnswers);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res,next) => {
  try {
    const userAnswer = await userAnswerService.createUserAnswer(req.body,req.user);
    res.status(CREATED).json(userAnswer);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req,res,next) => {
  try {
    const userAnswer = await userAnswerService.updateUserAnswer(req.params.id, req.body);
    res.status(OK).json(userAnswer);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req,res,next) => {
  try {
    await userAnswerService.deleteUserAnswer(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;