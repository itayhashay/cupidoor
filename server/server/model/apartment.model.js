const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  // type: {
  //   type: String,
  //   enum: ["Apartment", "Land House", "Penthouse"],
  //   default: "Apartment",
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "-password" },
  },
  description: {
    type: String,
    required: true
  },
  propertyCondition: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  elevator: {
    type: Boolean,
    required: true
  },
  houseArea: {
    type: String,
    required: true
  },
  parkings: {
    type: Number,
    required: true
  },
  balconies: {
    type: Number,
    required: true
  },
  entranceDate: {
    type: Date,
    default: Date.now,
  },
  furnished: {
    type: Boolean,
    required: true
  },
  bars: {
    type: Boolean,
    required: true
  },
  boiler: {
    type: Boolean,
    required: true
  },
  airConditioner: {
    type: Boolean,
    required: true
  },
  accessible: {
    type: Boolean,
    required: true
  },
  garage: {
    type: Boolean,
    required: true
  },
  shelter: {
    type: Boolean,
    required: true
  },
  longTerm: {
    type: Boolean,
    required: true
  },
  numOfPayments: {
    type: Number,
    required: true
  },
  paymentDay: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }, 
  committee: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  images: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

module.exports = Apartment;
