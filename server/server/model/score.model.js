const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  tenent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "-password" },
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    autopopulate: true,
  },
  score: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}).plugin(require("mongoose-autopopulate"));

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
