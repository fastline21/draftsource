const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);
