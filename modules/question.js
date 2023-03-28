const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const questionsSchema = new mongoose.Schema({

    questionId: {
        type: String,
        required: true,
        unique: true
    },

    setUnder: {
        type: String,
        required: true
    },

    questionName: {
        type: String,
        trim: true
    },

    questionCategory: {
        type: String,
        required: true
    },

    questionChoices: {
        type: [Object], // [{answerId: 2681, answer: "Answer"},{answerId: 8940, answer: "Answer"},{answerId: 4895, answer: "Answer"},{answerId: 5699, answer: "Answer"},]
        required: true
    },

    questionAnswer: {
        type: [Object], //{answerId: 4895, answer: "Answer"}
        required: true
    },



}, { timestamps: true });

module.exports = mongoose.model("Question", questionsSchema);