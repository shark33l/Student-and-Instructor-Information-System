const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//UserModel Schema
const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userLevel: {
      type: Number,
      required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken : {
        type: String,
    },
    resetPasswordExpires : {
        type: String
    }
});

mongoose.model('UserModel', UserSchema);

module.exports = mongoose;