const Score = require("../model/score.model");

const createScore = async (scoreData) => {
  try {
    const score = new Score(scoreData);
    return await score.save();
  } catch (err) {
    throw new Error("Error creating score: " + err.message);
  }
};

const getScores = async () => {
  try {
    return await Score.find();
  } catch (err) {
    throw new Error("Error getting scores: " + err.message);
  }
};

const getScore = async (id) => {
  try {
    return await Score.findById(id);
  } catch (err) {
    throw new Error("Error getting score: " + err.message);
  }
};

const updateScore = async (id, scoreData) => {
  try {
    const score = await Score.findById(id);
    if (scoreData.score != null) {
      score.score = scoreData.score;
    }
    if (scoreData.tenant != null) {
      score.tenant = scoreData.tenant;
    }
    if (scoreData.apartment != null) {
      score.apartment = scoreData.apartment;
    }
    score.updatedAt = Date.now();
    return await score.save();
  } catch (err) {
    throw new Error("Error updating score: " + err.message);
  }
};

const deleteScore = async (id) => {
  try {
    return await Score.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Error deleting score: " + err.message);
  }
};

const getApartmentsScores = async (userId, apartments) => {
  const scores = await Score.find(
    { tenant: userId },
    { score: 1, apartment: 1 }
  ).lean();
  
  const apartmentToScore = {};
  const apartmentsMatches = [];
  for (let score of scores) {
    const apartmentId =
      typeof score.apartment === "string"
        ? score.apartment
        : score.apartment.toString();
    apartmentToScore[apartmentId] = score.score;
  }

  for (let apartment of apartments) {
    const apartmentId =
      typeof apartment._id === "string"
        ? apartment._id
        : apartment._id.toString();
    apartmentsMatches.push({
      ...apartment,
      match: apartmentToScore[apartmentId],
    });
  }
  apartmentsMatches.sort((a,b)=>{
    if(a.match > b.match){
      return -1;
    }else{
      return 1
    }
    
    
  })
  return apartmentsMatches;
};

module.exports = {
  createScore,
  getScores,
  getScore,
  updateScore,
  deleteScore,
  getApartmentsScores,
};
