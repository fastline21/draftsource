const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
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
    email: {
        type: String,
    },
    cellphone: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    facebook: {
        type: String,
    },
    resumeImage: {
        type: String,
    },
    workspace: {
        type: String,
    },
    internetType: {
        type: String,
    },
    hardwareType: {
        type: String,
    },
    brandName: {
        type: String,
    },
    internetResult: {
        type: String,
    },
    computerSpecs: {
        type: String,
    },
    availability: {
        type: String,
    },
    expectedSalary: {
        type: Number,
    },
    currency: {
        type: String,
    },
    aboutYourself: {
        type: String,
    },
    education: {
        type: Array,
        choices: {
            type: String,
        },
        degree: {
            type: String,
        },
        school: {
            type: String,
        },
        course: {
            type: String,
        },
        monthYearStarted: {
            type: String,
        },
        monthYearGraduated: {
            type: String,
        },
    },
    workHistory: {
        type: Array,
        title: {
            type: String,
        },
        company: {
            type: String,
        },
        monthStarted: {
            type: String,
        },
        yearStarted: {
            type: Number,
        },
        monthEnded: {
            type: String,
        },
        yearEnded: {
            type: Number,
        },
        description: {
            type: String,
        },
        about: {
            type: String,
        },
    },
    specialty: {
        type: Array,
    },
    software: {
        type: Array,
    },
    uploadWork: {
        type: Object,
        images: {
            type: Array,
            file: {
                type: String,
            },
            title: {
                type: String,
            },
        },
        documents: {
            type: Array,
            file: {
                type: String,
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            },
        },
    },
    status: {
        type: String,
        default: 'Pending',
    },
    recruitmentsComment: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Resume', ResumeSchema);
