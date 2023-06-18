const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  answer: {
    type: String, // Can be boolean - is 0 or 1
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

module.exports = UserAnswer;
