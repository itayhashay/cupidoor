const express = require("express");
const router = express.Router();
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");
const verifyToken = require("../middlewares/verifyToken");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: APIs for managing users
 */


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
router.post("/", async (req,res,next) => {
  try {
    const user = await authService.signUp(req.body);
    res.status(CREATED).json(user);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user/all:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/User"
 */
router.get("/all",[verifyToken], async (req, res,next) => {
  try {
    if (!req.isAdmin) {
      const error = new Error("UnAuthorized!");
      error.status = 401;
      throw error;
    }
    const users = await userService.getUsers();
    res.status(OK).json(users);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get current user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
router.get("/",[verifyToken], async (req, res,next) => {
  try {
    const user = await userService.getUserData(req.user._id);
    res.status(OK).json(user);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 */
router.get('/:id', async (req, res,next) => {
  try {
    if (!req.isAdmin && req.params.id != req.user._id.toString()) {
      const error = new Error("UnAuthorized!");
      error.status = 401;
      throw error;
    }
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

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 */
router.put('/:id', async (req, res,next) => {
  try {
    if (!req.isAdmin && req.params.id != req.user._id.toString()) {
      const error = new Error("UnAuthorized!");
      error.status = 401;
      throw error;
    }
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(OK).json(user);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", async (req, res,next) => {
  try {
    if (!req.isAdmin && req.params.id != req.user._id.toString()) {
      const error = new Error("UnAuthorized!");
      error.status = 401;
      throw error;
    }
    await userService.deleteUser(req.params.id);
    res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
