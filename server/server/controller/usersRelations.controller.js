const express = require("express");
const router = express.Router();
const usersRelationsService = require("../service/usersRelations.service");
const {
  CREATED,
  OK,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");


/**
 * @swagger
 * tags:
 *   name: User Relations
 *   description: APIs for managing user relations (likes, matches, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRelations:
 *       type: object
 *       properties:
 *         tenant:
 *           type: string
 *           description: The ID of the tenant user
 *         apartment:
 *           type: string
 *           description: The ID of the apartment
 *         relation:
 *           type: string
 *           enum: [match]
 *           description: The relation between the tenant and the apartment
 *         status:
 *           type: string
 *           enum: [pending, declined, approved]
 *           default: pending
 *           description: The status of the relation
 *       example:
 *         tenant: tenantId
 *         apartment: apartmentId
 *         relation: match
 *         status: pending
 */

/**
 * @swagger
 * /users-relations/tenant/likes/:
 *   get:
 *     summary: Get all likes of the tenant
 *     tags: [User Relations]
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
// Get all likes of tenant
router.get("/tenant/likes/", async (req, res, next) => {
  try {
    const likes = await usersRelationsService.getLikesByTenantId(req.user._id);
    res.status(OK).json(likes);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /users-relations/tenant/matches/{tenantId}/:
 *   get:
 *     summary: Get all matches of the tenant
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the tenant
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
// Get all matches of tenant
router.get("/tenant/matches/:tenantId", async (req, res, next) => {
  try {
    const matches = await usersRelationsService.getMatchesByTenantId(
      req.params.tenantId
    );
    res.status(OK).json(matches);
  } catch (err) {
    next(err);
  }
});


/**
 * @swagger
 * /users-relations/apartment/likes/{apartmentId}/:
 *   get:
 *     summary: Get all likes of the apartment
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
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
// Get all likes of tenant
router.get("/apartment/likes/:apartmentId", async (req, res, next) => {
  try {
    const likes = await usersRelationsService.getLikesByApartmentId(
      req.params.apartmentId
    );
    res.status(OK).json(likes);
  } catch (err) {
    next(err);
  }
});

 /**
 * @swagger
 * /users-relations/apartment/matches/{apartmentId}/:
 *   get:
 *     summary: Get all matches of the apartment
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
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
// Get all matches of apartment
router.get("/apartment/matches/:apartmentId", async (req, res, next) => {
  try {
    const matches = await usersRelationsService.getMatchesByApartmentId(
      req.params.apartmentId
    );
    res.status(OK).json(matches);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users-relations/tenant/like/{apartmentId}:
 *   post:
 *     summary: Like/unlike an apartment as a tenant
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: apartmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Like created/unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserRelations"
 */
// Get from params apartment ID and from body tenant ID and create a like/unlike
router.post("/tenant/like/:apartmentId", async (req, res, next) => {
  try {
    const like = await usersRelationsService.likeApartment(
      req.user._id,
      req.params.apartmentId
    );
    if (like) res.status(CREATED).json(like);
    else res.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users-relations/apartment/match/{tenantId}:
 *   post:
 *     summary: Match a tenant with an apartment
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentId:
 *                 type: string
 *                 description: ID of the apartment
 *             example:
 *               apartmentId: apartmentId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tenant matched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserRelations"
 */
// Get a tenant ID form params and form body the apartment ID and create a new match
router.post("/apartment/match/:tenantId", async (req, res, next) => {
  try {
    const match = await usersRelationsService.matchTenant(
      req.params.tenantId,
      req.body.apartmentId,
      req.user._id.toString()
    );
    res.status(OK).json(match);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /users-relations/apartment/decline/{tenantId}:
 *   post:
 *     summary: Decline a match with a tenant for an apartment
 *     tags: [User Relations]
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the tenant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               apartmentId:
 *                 type: string
 *                 description: ID of the apartment
 *             example:
 *               apartmentId: apartmentId
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tenant match declined successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/UserRelations"
 */
// Get a tenant ID form params and form body the apartment ID and decline match
router.post("/apartment/decline/:tenantId", async (req, res, next) => {
  try {
    const match = await usersRelationsService.declineTenet(
      req.params.tenantId,
      req.body.apartmentId
    );
    res.status(OK).json(match);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
