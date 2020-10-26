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
	description: {
		type: String,
	},
	about: {
		type: String,
	},
	budget: {
		type: Object,
		min: {
			type: String,
		},
		max: {
			type: String,
		},
	},
	workDuration: {
		type: String,
	},
	timeZone: {
		type: String,
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
	company: {
		type: String,
	},
	website: {
		type: String,
	},
	cellphone: {
		type: String,
	},
	country: {
		type: String,
	},
	linkedIn: {
		type: String,
	},
	agentName: {
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
