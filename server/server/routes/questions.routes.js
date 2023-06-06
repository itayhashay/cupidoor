const QuestionsController = require("../controller/question.controller");

const router = require("express").Router();

router.get("/questions", QuestionsController.getQuestions);
router.get("/questions/:id", QuestionsController.getQuestion);
router.post("/questions", QuestionsController.createQuestion);
router.put("/questions/:id", QuestionsController.updateQeustions);
router.delete("/questions/:id", QuestionsController.deleteQeustions);

module.exports = router;
