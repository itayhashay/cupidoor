const express = require('express');
const router = express.Router();
const usersRelationsService = require('../service/usersRelations.service');
const { CREATED, OK, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

// Get all likes of tenant
router.get('/tenant/likes/', async (req, res,next) => {
    try {
        const likes = await usersRelationsService.getLikesByTenantId(req.user._id);
        res.status(OK).json(likes);
    } catch (err) {
        next(err);
    }
});

// Get all matches of tenant
router.get('/tenant/matches/:tenantId', async (req, res,next) => {
    try {
        const matches = await usersRelationsService.getMatchesByTenantId(req.params.tenantId);
        res.status(OK).json(matches);
    } catch (err) {
        next(err);
    }
});

// Get all likes of tenant
router.get('/apartment/likes/:apartmentId', async (req, res,next) => {
    try {
        const likes = await usersRelationsService.getLikesByApartmentId(req.params.apartmentId);
        res.status(OK).json(likes);
    } catch (err) {
        next(err);
    }
});

// Get all matches of apartment
router.get('/apartment/matches/:apartmentId', async (req, res,next) => {
    try {
        const matches = await usersRelationsService.getMatchesByApartmentId(req.params.apartmentId);
        res.status(OK).json(matches);
    } catch (err) {
        next(err);
    }
});

// Get from params apartment ID and from body tenant ID and create a like/unlike
router.post('/tenant/like/:apartmentId', async (req, res,next) => {
    try {
        const like = await usersRelationsService.likeApartment(req.user._id, req.params.apartmentId);
        if (like)
            res.status(CREATED).json(like);
        else
            res.status(NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
});

// Get a tenant ID form params and form body the apartment ID and create a new match
router.post('/apartment/match/:tenantId', async (req, res,next) => {
    try {
        const match = await usersRelationsService.matchTenant(req.params.tenantId, req.body.apartmentId);
        res.status(OK).json(match);
    } catch (err) {
        next(err);
    }
});

// Get a tenant ID form params and form body the apartment ID and decline match
router.post('/apartment/decline/:tenantId', async (req, res,next) => {
    try {
        const match = await usersRelationsService.declineTenet(req.params.tenantId, req.body.apartmentId);
        res.status(OK).json(match);
    } catch (err) {
        next(err);
    }
});

module.exports = router;