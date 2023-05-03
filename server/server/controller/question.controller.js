const express = require('express');
const router = express.Router();
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');
const questionService = require('../service/question.service');

router.post('/', async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(CREATED).json(question);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(OK).json(questions);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const question = await questionService.getQuestion(req.params.id);
    if (!question) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(question);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
    res.status(OK).json(updatedQuestion);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;