const Score = require('../model/score.model');

const createScore = async (scoreData) => {
  try {
    const score = new Score(scoreData);
    return await score.save();
  } catch (err) {
    throw new Error('Error creating score: ' + err.message);
  }
}

const getScores = async () => {
  try {
    return await Score.find();
  } catch (err) {
    throw new Error('Error getting scores: ' + err.message);
  }
}

const getScore = async (id) => {
  try {
    return await Score.findById(id);
  } catch (err) {
    throw new Error('Error getting score: ' + err.message);
  }
}

const updateScore = async (id, scoreData) => {
  try {
    const score = await Score.findById(id);
    if (scoreData.score != null) {
      score.score = scoreData.score;
    }
    if (scoreData.tenent != null) {
      score.tenent = scoreData.tenent; 
    }
    if (scoreData.apartment != null) {
      score.apartment = scoreData.apartment; 
    }
    score.updatedAt = Date.now();
    return await score.save();
  } catch (err) {
    throw new Error('Error updating score: ' + err.message);
  }
}

const deleteScore = async (id) => {
  try {
    return await Score.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting score: ' + err.message);
  }
}

module.exports = {
  createScore,
  getScores,
  getScore,
  updateScore,
  deleteScore
};