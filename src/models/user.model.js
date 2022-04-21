const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    userAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
    },
    lastName: {
        type: String,
        required: false,
    },
    addres: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('User', userSchema, 'users');
