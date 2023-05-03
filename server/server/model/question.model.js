const mongoose = require('mongoose');

const questionScheme = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }
});

const Question= mongoose.model('Question', questionScheme);

module.exports = Question;