const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
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
	age: {
		type: Number,
	},
	gender: {
		type: String,
	},
	city: {
		type: String,
	},
	// country: {
	// 	type: String,
	// },
	linkedIn: {
		type: String,
	},
	recruiterName: {
		type: String,
	},
});

module.exports = mongoose.model('Temp', TempSchema);
