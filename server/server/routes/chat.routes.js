const ChatController = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/conversations", ChatController.getConversations);
router.get("/:userId", ChatController.getConversation);
router.post("/messages", ChatController.sendMessage);
module.exports = router;
