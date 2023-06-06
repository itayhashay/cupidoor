const mongoose = require("mongoose");

const questionScheme = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  tenant: {
    type: String,
    required: true,
  },
  landlord: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", questionScheme);

module.exports = Question;
