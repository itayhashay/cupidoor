const Question = require('../model/question.model');
 
const createQuestion = async (questionData) => {
  try {
    // const question = new Question(questionData);
    const question = await Question.create(questionData);
    return await question.save();
  } catch (err) {
    throw new Error('Error creating question: ' + err.message);
  }
}
 const getQuestions = async () => {
  try {
    return await Question.find();
  } catch (err) {
    throw new Error('Error getting questions: ' + err.message);
  }
}
 
const getQuestion = async (id) => {
  try {
    return await Question.findById(id);
  } catch (err) {
    throw new Error('Error getting question: ' + err.message);
  }
}

const updateQuestion= async (id, questionData) => {
  try {
    const question = await Question.findById(id);
    if (questionData.questionName != null) {
      question.questionName = questionData.questionName;
    }
    if (questionData.tenant != null) {
      question.tenant = questionData.tenant;
    }
    if (questionData.landlord != null) {
      question.landlord = questionData.landlord;
    }
    return await question.save();
  } catch (err) {
    throw new Error('Error updating question: ' + err.message);
  }
}

const deleteQuestion = async (id) => {
  try {
    return await Question.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting question: ' + err.message);
  }
}

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion
};