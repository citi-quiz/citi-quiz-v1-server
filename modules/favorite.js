const mongoose = require('mongoose');


const favoriteSchema = new mongoose.Schema({

    favoriteId: {
        type: String,
        unique: true,
        required: true
    },

    favoriteName: {
        type: String
    },

    favoriteList: {
        type: String
    }

});


module.exports = mongoose.model("Favorite", favoriteSchema);