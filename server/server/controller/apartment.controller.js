const express = require("express");
const router = express.Router();
const apartmentService = require("../service/apartment.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");

// Create apartment
router.post("/", async (req, res, next) => {
  try {
    const apartment = await apartmentService.createApartment(req.body,req.user);
    res.status(CREATED).json(apartment);
  } catch (err) {
    next(err);
  }
});

router.get("/landlord/:userId", async (req, res, next) => {
  try {
    if(!req.isAdmin && req.params.userId != req.user?._id.toString()){
      const error = new Error("UnAuthorized!");
      error.status = 401;
      throw error;
    }
    const apartments = await apartmentService.getApartmentsByUser(
      req.params.userId
    );
    res.status(OK).json(apartments);
  } catch (err) {
    next(err);
  }
});

// Get all apartments
router.get("/", async (req, res, next) => {
  try {
    const apartments = await apartmentService.getApartments(req.user);
    res.status(OK).json(apartments);
  } catch (err) {
    next(err);
  }
});

// Get apartment by ID
router.get("/:id", async (req, res, next) => {
  try {
    const apartment = await apartmentService.getApartment(req.params.id,req.user);
    if (!apartment) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(OK).json(apartment);
    }
  } catch (err) {
    next(err);
  }
});

// Update apartment
router.put("/:id", async (req, res, next) => {
  try {
    if(!req.isAdmin ){
      const error = new Error("UnAuthorized!");
      error.status = 401;
      if(typeof req.body.user == "string" && req.body.user != req.user._id.toString()){
        throw error;
      }else if(typeof req.body.user != "string" && req.body.user._id != req.user._id.toString()){
        throw error;
      }
      
      
    }

    const apartment = await apartmentService.updateApartment(
      req.params.id,
      req.body
    );
    if (!apartment) {
      res.status(404).send();
    } else {
      res.status(200).json(apartment);
    }
  } catch (err) {
    next(err);
    // res.status(400).json({ error: err.message });
  }
});

// Delete apartment
router.delete("/:id", async (req, res, next) => {
  try {
    const apartment = await apartmentService.deleteApartment(req.params.id);
    if (!apartment) {
      res.status(NOT_FOUND).send();
    } else {
      res.status(NO_CONTENT).send();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
