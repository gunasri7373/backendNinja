const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({

    userAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    noteText: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Note', notesSchema, 'notes');
