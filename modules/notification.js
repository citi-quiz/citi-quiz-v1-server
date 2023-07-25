const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const notificationSchema = new mongoose.Schema({

    notificationId: {
        type: String,
        required: true,
        unique: true
    },

    notificationTitle: {
        type: String,
        required: true
    },

    notificationDescription: {
        type: String,
        required: true
    },

    notificationLink: {
        type: String,
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model("Notification", notificationSchema);
