const express = require('express');
const router = express.Router();
const AdminController = require('../controller/admin.controller');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');


router.get("/users", AdminController.getAllUsers);
router.get('/apartments', AdminController.getAllApartments);
router.get('/analytics', AdminController.getAnalytics);

module.exports = router
