const express = require('express');
const router = express.Router();

// Models
const User = require('./../models/User');
const Employer = require('../models/Employer');
const Job = require('./../models/Job');

// Middleware
const auth = require('./../middleware/auth');

// @route   POST /api/job
// @desc    Draft a job
// @access  Public
router.post('/', async (req, res) => {
	const {
		title,
		specialty,
		software,
		description,
		about,
		budget,
		workDuration,
		timeZone,
		firstName,
		lastName,
		email,
		company,
		website,
		cellphone,
		country,
		linkedIn,
		agentName,
		// roles,
		// keyResponsibilities,
		// responsibilities,
		// remoteStaffExpectation,
		// availability,
		// expectedSalary,
		// currency,
	} = req.body;

	if (
		title === '' ||
		specialty.length === 0 ||
		software.length === 0 ||
		description === '' ||
		about === '' ||
		budget.min === '' ||
		budget.max === '' ||
		workDuration === '' ||
		timeZone === '' ||
		firstName === '' ||
		lastName === '' ||
		email === '' ||
		company === '' ||
		website === '' ||
		cellphone === '' ||
		country === '' ||
		linkedIn === ''
	) {
		return res
			.status(400)
			.json({ msg: 'Please fill-in the required boxes to Proceed.' });
	} else {
		try {
			let user = await User.findOne({ email });

			if (!user) {
				user = new User({
					email,
					password: '',
					type: 'Employer',
				});
				await user.save();
			}

			const job = new Job({
				user: user._id,
				title,
				specialty,
				software,
				description,
				about,
				budget,
				workDuration,
				timeZone,
				firstName,
				lastName,
				email,
				company,
				website,
				cellphone,
				country,
				linkedIn,
				agentName,
			});
			await job.save();
			res.json(job);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}

	// if (
	// 	title === '' ||
	// 	specialty.length === 0 ||
	// 	software.length === 0 ||
	// 	about === '' ||
	// 	roles.length === 0 ||
	// 	keyResponsibilities.length === 0 ||
	// 	responsibilities.length === 0 ||
	// 	remoteStaffExpectation === '' ||
	// 	availability === '' ||
	// 	expectedSalary === '' ||
	// 	currency === ''
	// ) {
	// 	res.status(400).json({
	// 		msg: 'Please fill-in the required boxes to Proceed.',
	// 	});
	// } else {
	// 	try {
	// 		const employer = await Employer.findOne({ user: req.user.id });
	// 		const { country, company } = employer;
	// 		const jobFields = {
	// 			user: req.user.id,
	// 			title,
	// 			about,
	// 			remoteStaffExpectation,
	// 			availability,
	// 			expectedSalary,
	// 			currency,
	// 			specialty,
	// 			software,
	// 			roles,
	// 			keyResponsibilities,
	// 			responsibilities,
	// 			country,
	// 			industry: company.industry,
	// 			company: company.name,
	// 		};
	// 		const job = new Job(jobFields);
	// 		await job.save();
	// 		res.json(job);
	// 	} catch (error) {
	// 		console.error(error.message);
	// 		res.status(500).send('Server Error');
	// 	}
	// }
});

// @route   GET /api/job/new-jobs
// @desc    Get pending jobs
// @access  Private
router.get('/new-jobs', auth, async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty' || key === 'software') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: value.split(',') };
			} else {
				queryData = { ...queryData, [key]: value };
			}
		} else if (key === 'search') {
			queryData = {
				...queryData,
				$or: [
					{ specialty: new RegExp(`^${value}$`, 'i') },
					{ software: new RegExp(`^${value}$`, 'i') },
				],
			};
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			queryData = { ...queryData, [key]: value };
		}
	}
	const job = await Job.find({ ...queryData, status: 'Pending' });
	const page = parseInt(query.page) || 1;
	const limit = parseInt(query.limit) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const results = {};
	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit,
		};
	}

	if (endIndex < job.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	results.total = job.length;

	results.job = job.slice(startIndex, endIndex);
	res.json(results);
});

// @route   GET /api/job/approved-jobs
// @desc    Get pending jobs
// @access  Private
router.get('/approved-jobs', auth, async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty' || key === 'software') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: value.split(',') };
			} else {
				queryData = { ...queryData, [key]: value };
			}
		} else if (key === 'search') {
			queryData = {
				...queryData,
				$or: [
					{ specialty: new RegExp(`^${value}$`, 'i') },
					{ software: new RegExp(`^${value}$`, 'i') },
				],
			};
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			queryData = { ...queryData, [key]: value };
		}
	}
	const job = await Job.find({ ...queryData, status: 'Approve' });
	const page = parseInt(query.page) || 1;
	const limit = parseInt(query.limit) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const results = {};
	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit,
		};
	}

	if (endIndex < job.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	results.total = job.length;

	results.job = job.slice(startIndex, endIndex);
	res.json(results);
});

// @route   GET /api/job/rejected-jobs
// @desc    Get rejected jobs
// @access  Private
router.get('/rejected-jobs', auth, async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty' || key === 'software') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: value.split(',') };
			} else {
				queryData = { ...queryData, [key]: value };
			}
		} else if (key === 'search') {
			queryData = {
				...queryData,
				$or: [
					{ specialty: new RegExp(`^${value}$`, 'i') },
					{ software: new RegExp(`^${value}$`, 'i') },
				],
			};
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			queryData = { ...queryData, [key]: value };
		}
	}
	const job = await Job.find({ ...queryData, status: 'Reject' });
	const page = parseInt(query.page) || 1;
	const limit = parseInt(query.limit) || 10;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const results = {};
	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit,
		};
	}

	if (endIndex < job.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	results.total = job.length;

	results.job = job.slice(startIndex, endIndex);
	res.json(results);
});

// @route   PUT /api/job/approve-job
// @desc    Approve job
// @access  Private
router.put('/approve-job', auth, async (req, res) => {
	const { id } = req.body;
	const job = await Job.findByIdAndUpdate(id, {
		status: 'Approve',
	});
	res.json(job);
});

// @route   PUT /api/job/reject-job
// @desc    Reject job
// @access  Private
router.put('/reject-job', auth, async (req, res) => {
	const { id } = req.body;
	const job = await Job.findByIdAndUpdate(id, {
		status: 'Reject',
	});
	res.json(job);
});

// @route   PUT /api/job/delete-job
// @desc    Delete job
// @access  Private
router.delete('/delete-job/:id', auth, async (req, res) => {
	const { id } = req.params;
	await Job.findByIdAndDelete(id);
});

// @route   POST /api/job/view-details
// @desc    View details
// @access  Private
router.post('/view-details', auth, async (req, res) => {
	const { id } = req.body;
	const job = await Job.findById(id);
	res.json(job);
});

module.exports = router;
