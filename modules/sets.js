const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const setsSchema = new mongoose.Schema({

    setId: {
        type: String,
        required: true,
        unique: true
    },

    setName: {
        type: String,
        mmaxLength: 32,
        trim: true
    },

    setDescription: {
        type: String,
        requied: true
    },

    setCategory: {
        type: ObjectId,
        required: true,
        ref: "SetCategory"
    },

    setTitle: {
        type: String,
        required: true
    },

    setDifficulty: {
        type: String,
        enum: ["Easy", "Medium", "High"],
        default: "Easy",
        requied: true
    },

    setikes: {
        type: Number,
        default: 0
    },

    setQuestions: {
        type: [String]
    }




}, { timestamps: true });


module.exports = mongoose.model("Sets", setsSchema);