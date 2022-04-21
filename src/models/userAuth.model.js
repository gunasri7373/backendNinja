const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: false,
        minlength: 8
    },
});

module.exports = mongoose.model('UserAuth', userAuthSchema, 'userauths');
