const mongoose = require("mongoose");

const usersRelationsSchema = new mongoose.Schema({
  members: {
    type: [
      //   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      //   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      String,
      String,
    ],
  },
  relation: {
    type: String,
    enum: ["match"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "declined", "approved"],
    default: "pending",
  },
});

const UsersRelations = mongoose.model("UsersRelations", usersRelationsSchema);

module.exports = UsersRelations;
