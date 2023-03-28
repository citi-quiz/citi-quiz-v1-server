const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({

    testId: {
        type: String,
        required: true
    },

    setId: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    questionId: {
        type: [Object],
        required: true
    },

    score: {
        type: String,
        required: true
    },

    rank: {
        type: String,
        required: true
    },

    result: {
        type: String,
        enum: ["Pass", "Fail", "Init"],
        default: "Init",
        required: true
    },

    review: {
        type: String,
        required: true
    },

    save: {
        type: Boolean,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Test", testSchema);