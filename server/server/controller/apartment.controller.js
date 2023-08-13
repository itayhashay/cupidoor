const express = require("express");
const router = express.Router();
const apartmentService = require("../service/apartment.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  BAD_REQUEST,
} = require("http-status-codes");

 /**
  * @swagger
  * tags:
  *   name: Apartment
  *   description: The Apartment API
  */


 /**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *           required: true
 *         propertyCondition:
 *           type: string
 *           required: true
 *         city:
 *           type: string
 *           required: true
 *         street:
 *           type: string
 *           required: true
 *         houseNumber:
 *           type: string
 *           required: true
 *         floor:
 *           type: number
 *           required: true
 *         rooms:
 *           type: number
 *           required: true
 *         elevator:
 *           type: boolean
 *           required: true
 *         houseArea:
 *           type: string
 *           required: true
 *         parkings:
 *           type: number
 *           required: true
 *         balconies:
 *           type: number
 *           required: true
 *         entranceDate:
 *           type: string
 *           format: date
 *           required: true
 *         furnished:
 *           type: boolean
 *           required: true
 *         bars:
 *           type: boolean
 *           required: true
 *         boiler:
 *           type: boolean
 *           required: true
 *         airConditioner:
 *           type: boolean
 *           required: true
 *         accessible:
 *           type: boolean
 *           required: true
 *         garage:
 *           type: boolean
 *           required: true
 *         shelter:
 *           type: boolean
 *           required: true
 *         longTerm:
 *           type: boolean
 *           required: true
 *         numOfPayments:
 *           type: number
 *           required: true
 *         paymentDay:
 *           type: number
 *           required: true
 *         price:
 *           type: number
 *           required: true
 *         committee:
 *           type: number
 *           required: true
 *         tax:
 *           type: number
 *           required: true
 *         totalPrice:
 *           type: number
 *           required: true
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *       example:
 *         description: "Spacious apartment with a beautiful view"
 *         propertyCondition: "Good"
 *         city: "New York"
 *         street: "Main Street"
 *         houseNumber: "123"
 *         floor: 5
 *         rooms: 3
 *         elevator: true
 *         houseArea: "120 sqm"
 *         parkings: 1
 *         balconies: 1
 *         entranceDate: "2023-07-18"
 *         furnished: true
 *         bars: false
 *         boiler: true
 *         airConditioner: true
 *         accessible: true
 *         garage: false
 *         shelter: true
 *         longTerm: true
 *         numOfPayments: 12
 *         paymentDay: 1
 *         price: 1500
 *         committee: 100
 *         tax: 50
 *         totalPrice: 1650
 *         images:
 *           - name: "Living Room"
 *             url: "https://example.com/living-room.jpg"
 *           - name: "Bedroom"
 *             url: "https://example.com/bedroom.jpg"
 */

 /**
 * @swagger
 * /apartment:
 *   post:
 *     summary: Create a new apartment
 *     security:
 *       - bearerAuth: []
 *     tags: [Apartment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 */
// Create apartment
router.post("/", async (req, res, next) => {
  try {
    const apartment = await apartmentService.createApartment(req.body,req.user);
    res.status(CREATED).json(apartment);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /apartment/landlord/{userId}:
 *   get:
 *     summary: Get apartments by user
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 */
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

/**
 * @swagger
 * /apartment:
 *   get:
 *     summary: Get all apartments
 *     security:
 *       - bearerAuth: []
 *     tags: [Apartment]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apartment'
 */
// Get all apartments
router.get("/", async (req, res, next) => {
  try {
    const apartments = await apartmentService.getApartments(req.user);
    res.status(OK).json(apartments);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /apartment/{id}:
 *   get:
 *     summary: Get apartment by ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Apartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 */
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


/**
 * @swagger
 * /apartment/{id}:
 *   put:
 *     summary: Update an apartment
 *     tags: [Apartment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       200:
 *         description: Apartment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apartment'
 *       404:
 *         description: Apartment not found
 */
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


/**
 * @swagger
 * /apartment/{id}:
 *   delete:
 *     summary: Delete an apartment
 *     security:
 *       - bearerAuth: []
 *     tags: [Apartment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the apartment
 *     responses:
 *       204:
 *         description: Apartment deleted successfully
 *       404:
 *         description: Apartment not found
 */
// Delete apartment
router.delete("/:id", async (req, res, next) => {
  try {
    if(!req.isAdmin ){
      const error = new Error("UnAuthorized!");
      error.status = 401;
      const apartmentResponse = await apartmentService.getApartment(req.params.id,req.user);
      if(apartmentResponse){
        if(apartmentResponse.user._id != req.user._id.toString()){
          throw error;
        }
      } 
    }
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
