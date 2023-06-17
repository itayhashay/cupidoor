const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "-password -salt -refreshToken" },
  },
  apartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Apartment",
    autopopulate: true,
  },
  landlord:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "-password -salt -refreshToken" },
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
