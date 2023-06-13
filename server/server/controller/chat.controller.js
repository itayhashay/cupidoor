const ChatService = require("../service/chat.service");

const ChatController = {
  getTenantMatches: async (req, res, next) => {
    try {
      const matches = await ChatService.getTenantMatches(req.user);
      return res.json({ matches });
    } catch (ex) {
      next(ex);
    }
  },
  getLandlordMatches: async (req, res, next) => {
    try {
      const matches = await ChatService.getLandlordMatches(req.user);
      return res.json({ matches });
    } catch (ex) {
      next(ex);
    }
  },
  getConversations: async (req, res, next) => {
    try {
      const conversations = await ChatService.getConversations(req.user);
      return res.json({ conversations });
    } catch (ex) {
      res.status(500).json({ error: ex.message });
      next(ex);
    }
  },
  getConversation: async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not Authorized!" });
    }

    try {
      let conversation = await ChatService.getConversation(
        req.user,
        req.params.conversationId
      );

      // if (!conversation) {
      //   conversation = await ChatService.createConversation(fromUser, toUser);
      // }
      return res.json({ ...conversation });
    } catch (ex) {
      res.status(500).json({ error: ex.message });
      next(ex);
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
      res.status(500).json({ error: ex.message });
      next(ex);
    }
  },
};

module.exports = ChatController;
