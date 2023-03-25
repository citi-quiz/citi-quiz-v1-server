const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        maxLength: 32,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true
    },




});


module.exports = mongoose.model("User", userSchema);