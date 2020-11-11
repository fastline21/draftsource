const express = require('express');
const router = express.Router();

// Models
const User = require('./../models/User');
const Employer = require('../models/Employer');
const Job = require('./../models/Job');

// Middleware
const auth = require('./../middleware/auth');

const getJobs = async (query, status) => {
	const searchOR = [];
	const queryData = {};
	for (const [key, value] of Object.entries(query)) {
		const keyword = value.split(',');
		if (key === 'search') {
			Object.assign(queryData, { $text: { $search: value } });
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			searchOR.push({
				[key]: {
					$in: keyword,
				},
			});
		}
	}

	if (searchOR.length > 0) {
		Object.assign(queryData, { $or: [...searchOR] });
	}

	let jobs = await Job.find({
		...queryData,
		status,
	});
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

	if (endIndex < jobs.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	results.total = jobs.length;

	results.jobs = jobs.slice(startIndex, endIndex);
	return results;
};

// @route   POST /api/job
// @desc    Draft a job
// @access  Public
router.post('/', async (req, res) => {
	const {
		title,
		specialty,
		software,
		marketType,
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
		marketType.length === 0 ||
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
				marketType,
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
});

// @route   GET /api/job/new-jobs
// @desc    Get pending jobs
// @access  Private
router.get('/new-jobs', auth, async (req, res) => {
	const results = await getJobs(req.query, 'Pending');
	res.json(results);
});

// @route   GET /api/job/approved-jobs
// @desc    Get pending jobs
// @access  Private
router.get('/approved-jobs', auth, async (req, res) => {
	const results = await getJobs(req.query, 'Approve');
	res.json(results);
});

// @route   GET /api/job/rejected-jobs
// @desc    Get rejected jobs
// @access  Private
router.get('/rejected-jobs', auth, async (req, res) => {
	const results = await getJobs(req.query, 'Reject');
	res.json(results);
});

// @route   PUT /api/job/approve-job
// @desc    Approve job
// @access  Private
router.put('/approve-job', auth, async (req, res) => {
	const { _id } = req.body;
	const job = await Job.findByIdAndUpdate(_id, {
		status: 'Approve',
	});
	res.json(job);
});

// @route   PUT /api/job/reject-job
// @desc    Reject job
// @access  Private
router.put('/reject-job', auth, async (req, res) => {
	const { _id } = req.body;
	const job = await Job.findByIdAndUpdate(_id, {
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
	return res.json({ success: true });
});

// @route   POST /api/job/view-details
// @desc    View details
// @access  Private
router.post('/view-details', auth, async (req, res) => {
	const { id } = req.body;
	const job = await Job.findById(id);
	res.json(job);
});

// @route	GET /api/job/view-job
// @desc	View Job
// @access	Private
router.get('/view-job/:id', async (req, res) => {
	const { id } = req.params;
	const job = await Job.findById(id);
	res.json(job);
});

module.exports = router;
