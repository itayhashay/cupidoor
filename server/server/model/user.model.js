const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/cupidoor-9a428.appspot.com/o/profiles%2Fdefault.png?alt=media&token=00ade410-04a4-44a5-9b88-615386abf78c&_gl=1*gjdizj*_ga*MTI1MDUwODEwMi4xNjg1OTA0NDkx*_ga_CW55HF8NVT*MTY4NjA3Mzg2MS4yLjEuMTY4NjA3Mzk1Mi4wLjAuMA.."
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["tenant", "landlord", "both", "admin"],
    default: "tenant",
  },
  description: {
    type: String,
    required: false,
  },
  answeredQuestions: {
    type: Boolean,
    default: false,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: [String],
});

userSchema.virtual("name").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
