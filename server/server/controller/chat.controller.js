const ChatService = require("../service/chat.service");

const ChatController = {
  getConversations: async (req, res, next) => {
    try {
      const conversations = await ChatService.getConversations(req.user?._id);
      return res.json({ conversations });
    } catch (ex) {
      return res.status(500).json({ error: ex.message });
    }
  },
  getConversation: async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not Authorized!" });
    }

    const fromUser = req.user._id.toString();
    const toUser = String(req.params.userId);

    try {
      let conversation = await ChatService.getConversation(fromUser, toUser);

      if (!conversation) {
        conversation = await ChatService.createConversation(fromUser, toUser);
      }
      return res.json({ ...conversation });
    } catch (ex) {
      return res.status(500).json({ error: ex.message });
    }
  },
  sendMessage: async (req, res, next) => {
    try {
      const { conversationId, sender, text } = req.body;
      const response = await ChatService.sendMessage(
        conversationId,
        sender,
        text
      );
      res.json({ success: true });
    } catch (ex) {
      return res.status(500).json({ error: ex.message });
    }
  },
};

module.exports = ChatController;
