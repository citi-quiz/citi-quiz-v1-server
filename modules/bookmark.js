const mongoose = require('mongoose');


const bookmarkSchema = new mongoose.Schema({

    bookmarkId: {
        type: String,
        unique: true,
        required: true
    },

    bookmarkName: {
        type: String
    },

    bookmarkList: {
        type: [String]
    }


}, { timestamps: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);