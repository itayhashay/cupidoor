const express = require('express');
const router = express.Router();
const apartmentService = require('../service/apartment.service');
const { CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = require('http-status-codes');

// Create apartment
router.post('/', async (req, res) => {
  try {
    const apartment = await apartmentService.createApartment(req.body);
    res.status(CREATED).json(apartment);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

// Get all apartments
router.get('/', async (req, res) => {
  try {
    const apartments = await apartmentService.getApartments();
    res.status(OK).json(apartments);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

// Get apartment by ID
router.get('/:id', async (req, res) => {
  try {
    const apartment = await apartmentService.getApartment(req.params.id);
    if (!apartment) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(apartment);
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

// Update apartment
router.put('/:id', async (req, res) => {
  try {
    const apartment = await apartmentService.updateApartment(req.params.id, req.body);
    if (!apartment) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(apartment);
    }
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});

// Delete apartment
router.delete('/:id', async (req, res) => {
  try {
    const apartment = await apartmentService.deleteApartment(req.params.id);
    if (!apartment) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(NO_CONTENT).send();
    }
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
});

module.exports = router;