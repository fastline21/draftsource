const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
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
    contactNo: {
        type: Number,
    },
    country: {
        type: String,
    },
    company: {
        type: Object,
        name: {
            type: String,
        },
        position: {
            type: String,
        },
        industry: {
            type: String,
        },
        website: {
            type: String,
        },
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Employer', EmployerSchema);
