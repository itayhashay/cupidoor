const UserAnswer = require('../model/userAnswer.model');
const UserModel= require("../model/user.model");
const mongoose = require("mongoose");
const ApartmentAnswer = require('../model/apartmentAnswer.model');
const ObjectId = mongoose.Types.ObjectId;


const createUserAnswer = async (userAnswerData,user) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    for(let questionData of userAnswerData){
      const {value : answer,priority,questionId} = questionData;
      const answerObject = await UserAnswer.findOne({user:user._id,question:questionData._id}).exec();
      if(answerObject){
        await UserAnswer.findByIdAndUpdate(answerObject._id,{answer,priority});
      }else{
        const userAnswer = new UserAnswer({
          user:user._id,
          question:new ObjectId(questionId),
          answer,
          priority
        });
        await userAnswer.save();
      }
      
    }
    const userObject = await UserModel.findByIdAndUpdate(user._id,{answeredQuestions:true});
    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Error creating user answer: ' + err.message);
  }finally{
    await session.endSession();
  }
}


const createApartmentAnswer = async (apartmentAnswerData,user) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    for(let questionData of apartmentAnswerData){
      const {value : answer,priority,questionId} = questionData;
      const answerObject = await ApartmentAnswer.findOne({apartment:apartmentAnswerData.apartmentId,question:questionData._id}).exec();
      if(answerObject){
        await ApartmentAnswer.findByIdAndUpdate(answerObject._id,{answer,priority});
      }else{
        const apartmentAnswer = new ApartmentAnswer({
          apartment:apartmentAnswerData.apartmentId,
          question:new ObjectId(questionId),
          answer,
          priority
        });
        await apartmentAnswer.save();
      }
      
    }
    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    throw new Error('Error creating apartment answer: ' + err.message);
  }finally{
    await session.endSession();
  }
}

const getUserAnswers = async (user) => {
  try {
    return await UserAnswer.find({user:user._id}).populate('question');
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
  createApartmentAnswer,
  getUserAnswers,
  getUserAnswer,
  updateUserAnswer,
  deleteUserAnswer
};