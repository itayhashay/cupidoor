const mongoose = require("mongoose");

const apartmentAnswerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
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

const ApartmentAnswer = mongoose.model("ApartmentAnswer", apartmentAnswerSchema);

module.exports = ApartmentAnswer;
