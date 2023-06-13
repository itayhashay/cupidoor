const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },
    status: {
      type: String,
      enum: ["sent", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
