const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Apartment', 'Land House', 'Penthouse'],
        default: 'Apartment'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    roomsAmount: {
        type: String,
        required: true
    },
    isBasement: {
        type: Boolean,
        required: true
    },
    haveBoiler: {
        type: Boolean,
        required: true
    },
    haveBalcony: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    accessible: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;