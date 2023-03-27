const mongoose = require('mongoose');

const setcategorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model("SetCategory", setcategorySchema);