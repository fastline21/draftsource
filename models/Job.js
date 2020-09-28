const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    title: {
        type: String,
    },
    specialty: {
        type: Array,
    },
    software: {
        type: Array,
    },
    about: {
        type: String,
    },
    roles: {
        type: Array,
    },
    keyResponsibilities: {
        type: Array,
    },
    responsibilities: {
        type: Array,
    },
    remoteStaffExpectation: {
        type: String,
    },
    availability: {
        type: String,
    },
    expectedSalary: {
        type: String,
    },
    currency: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Job', JobSchema);
