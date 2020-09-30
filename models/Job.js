const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    industry: {
        type: String,
    },
    country: {
        type: String,
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
    industry: {
        type: String,
    },
    country: {
        type: String,
    },
    company: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Job', JobSchema);
