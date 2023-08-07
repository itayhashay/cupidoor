const express = require("express");
const router = express.Router();
const AdminController = require("../controller/admin.controller");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");

router.get("/users", AdminController.getAllUsers);
router.put("/password", AdminController.adminUpdateUser);
router.get("/apartments", AdminController.getAllApartments);
router.get("/user/:userId", AdminController.getUser);
router.get("/analytics/users", AdminController.getUsersAnalytics);
router.get("/analytics/apartments", AdminController.getApartmentsAnalytics);
router.get("/analytics/matches", AdminController.getMatchesAnalytics);
router.get("/analytics/chats", AdminController.getChatAnalytics);

module.exports = router;
