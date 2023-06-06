const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
