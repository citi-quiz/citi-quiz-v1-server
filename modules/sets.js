const mongoose = require('mongoose');



const setsSchema = new mongoose.Schema({

    setId: {
        type: String,
        required: true,
        unique: true
    }


});


module.exports = mongoose.model("Sets", setsSchema);