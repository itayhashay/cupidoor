const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    tenent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    score: {
        type: Number,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
    
// Middleware function to update updatedAt field on every save
userSchema.pre('save', (next) =>{
    this.updatedAt = new Date();
    next();
});
const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;