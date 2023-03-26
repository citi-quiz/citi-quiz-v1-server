const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const questionsSchema = new mongoose.Schema({

    questionId: {
        type: String,
        required: true,
        unique: true
    },

    questionName: {
        type: String,
        maxLength: 32,
        trim: true
    },

    questionCategory: {
        type: String,
        required: true
    },

    questionAnswer: {
        type: [ObjectId],
        ref: "Ans"
    },



}, { timestamps: true });

module.exports = mongoose.model("Question", questionsSchema);