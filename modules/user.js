const mongoose = require('mongoose');
const crypto = require('crypto');
const { uuidv4 } = require('uuidv4');

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

    // Auth
    encry_password: {
        type: String
    },


    salt: String,

    email_verified: {
        type: String,
        required: true
    }


}, { timestamps: true });



userSchema.virtual('password').set(function(password) {
    this._password = password
    this.salt = uuidv4()
    this.encry_password = this.securePassword(password)
}).get(function() {
    return this._password
});


userSchema.methods = {

    authenticate: function(purePassword) {
        return this.securePassword(purePassword) === this.encry_password
    },

    securePassword: function(purePassword) {
        if (!purePassword)
            return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(purePassword)
                .digest('hex')
        } catch (err) {
            return "";
        }

    }

}



module.exports = mongoose.model("User", userSchema);