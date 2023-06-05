const express = require('express');
const router = express.Router();
const usersRelationsService = require('../service/userRelations.service');
const { CREATED, OK, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

// Get all likes of tenent
router.get('/likes/:tenentId', async (req, res) => {
    try {
        const likes = await usersRelationsService.getLikesByTenentId(req.params.tenentId);
        res.status(OK).json(likes);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get all matches of tenent
router.get('/matches/:tenentId', async (req, res) => {
    try {
        const matches = await usersRelationsService.getMatchesByTenentId(req.params.tenentId);
        res.status(OK).json(matches);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get all likes of tenent
router.get('/likes/:apartmentId', async (req, res) => {
    try {
        const likes = await usersRelationsService.getLikesByApartmentId(req.params.apartmentId);
        res.status(OK).json(likes);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get all matches of apartment
router.get('/matches/:apartmentId', async (req, res) => {
    try {
        const matches = await usersRelationsService.getMatchesByApartmentId(req.params.apartmentId);
        res.status(OK).json(matches);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get from params apartment ID and from body tenent ID and create a like/unlike
router.post('/like/:apartmentId', async (req, res) => {
    try {
        const like = await usersRelationsService.likeApartment(req.body.tenentId, req.params.apartmentId);
        if (like)
            res.status(CREATED).json(like);
        else
            res.status(NO_CONTENT).send();
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get a tenent ID form params and form body the apartment ID and create a new match
router.post('/match/:tenentId', async (req, res) => {
    try {
        const match = await usersRelationsService.matchTenent(req.params.tenentId, req.body.apartmentId);
        res.status(OK).json(match);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

// Get a tenent ID form params and form body the apartment ID and decline match
router.post('/decline/:tenentId', async (req, res) => {
    try {
        const match = await usersRelationsService.declineTenet(req.params.tenentId, req.body.apartmentId);
        res.status(OK).json(match);
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});

module.exports = router;