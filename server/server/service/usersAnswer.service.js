const UserAnswer = require('../model/userAnswer.model');

const createUserAnswer = async (userAnswerData) => {
  try {
    const userAnswer = new UserAnswer(userAnswerData);
    return await userAnswer.save();
  } catch (err) {
    throw new Error('Error creating user answer: ' + err.message);
  }
}

const getUserAnswers = async () => {
  try {
    return await UserAnswer.find().populate('question user');
  } catch (err) {
    throw new Error('Error getting user answers: ' + err.message);
  }
}

const getUserAnswer = async (id) => {
  try {
    return await UserAnswer.findById(id).populate('question user');
  } catch (err) {
    throw new Error('Error getting user answer: ' + err.message);
  }
}

const updateUserAnswer = async (id, userAnswerData) => {
  try {
    const userAnswer = await UserAnswer.findById(id);
    if (userAnswerData.question != null) {
      userAnswer.question = userAnswerData.question;
    }
    if (userAnswerData.user != null) {
      userAnswer.user = userAnswerData.user;
    }
    if (userAnswerData.answer != null) {
      userAnswer.answer = userAnswerData.answer;
    }
    return await userAnswer.save();
  } catch (err) {
    throw new Error('Error updating user answer: ' + err.message);
  }
}

const deleteUserAnswer = async (id) => {
  try {
    return await UserAnswer.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting user answer: ' + err.message);
  }
}

module.exports = {
  createUserAnswer,
  getUserAnswers,
  getUserAnswer,
  updateUserAnswer,
  deleteUserAnswer
};