const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", async (req,res,next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(CREATED).json(user);
  } catch (err) {
    next(err);
  }
});


router.get("/all",[verifyToken], async (req, res,next) => {
  try {
    const users = await userService.getUsers();
    res.status(OK).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/",[verifyToken], async (req, res,next) => {
  try {
    const user = await userService.getUserData(req.user._id);
    res.status(OK).json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res,next) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(user);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res,next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(OK).json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res,next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;