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

// const QuestionsController = {
//   async createQuestion(req, res, next) {
//     const questionDetails = req.body;
//     try {
//       res
//         .status(OK)
//         .json(await questionService.createQuestion(questionDetails));
//     } catch (ex) {
//       res.status(INTERNAL_SERVER_ERROR).json({ error: ex.message });
//       next(ex);
//     }
//   },
// };

// module.exports = QuestionsController;


router.post("/", async (req,res,next) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(CREATED).json(question);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req,res,next) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(OK).json(questions);
  } catch (err) {
    next(err);
  }
});

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

router.delete("/:id", async (req,res,next) => {
  try {
    await questionService.deleteQuestion(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
