const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ResumeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	idCode: {
		type: Number,
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
	linkedIn: {
		type: String,
	},
	resumeImage: {
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
	processor: {
		type: String,
	},
	ram: {
		type: String,
	},
	internetResult: {
		type: String,
	},
	expectedSalary: {
		type: String,
	},
	aboutYourself: {
		type: String,
	},
	headline: {
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
		companyExpertise: {
			type: Array,
		},
		country: {
			type: String,
		},
	},
	countryExpertise: {
		type: Array,
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
	},
	totalWorkYear: {
		type: Number,
	},
	status: {
		type: String,
		default: 'Pending',
	},
	recruitmentsComment: {
		type: String,
	},
	rating: {
		type: String,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

ResumeSchema.plugin(AutoIncrement, { inc_field: 'idCode' });
module.exports = mongoose.model('Resume', ResumeSchema);
