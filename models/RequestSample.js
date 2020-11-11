const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const RequestSampleSchema = new mongoose.Schema({
	id: {
		type: Number,
	},
	fullName: {
		type: String,
		required: true,
	},
	businessEmail: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: String,
		required: true,
	},
	companyName: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	dateSubmit: {
		type: Date,
		default: Date.now,
	},
});

RequestSampleSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('RequestSample', RequestSampleSchema);
