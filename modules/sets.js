const mongoose = require('mongoose');



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
        type: String,
        required: true
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
    }




});


module.exports = mongoose.model("Sets", setsSchema);