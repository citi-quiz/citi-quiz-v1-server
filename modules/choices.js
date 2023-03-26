const mongoose = require('mongoose');


const choiceChema = new mongoose.Schema({

    choiceQueue: {
        type: [Object],
        required: true
    },

    choiceAnswer: {
        type: String,
        required: true
    }



}, { timestamps: true });


module.exports = mongoose.model("Choice", choiceChema);