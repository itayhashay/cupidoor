const ChatController = require("../controller/chat.controller");

const router = require("express").Router();

router.get("/tenant/matches", ChatController.getTenantMatches);
router.get("/landlord/matches", ChatController.getLandlordMatches);
router.get("/conversations/:role", ChatController.getConversations);
router.get("/:conversationId", ChatController.getConversation);
router.post("/messages", ChatController.sendMessage);
module.exports = router;
