const express = require('express');
const router = express.Router();
const fs = require('fs');

// Models
const Resume = require('./../models/Resume');
const User = require('./../models/User');

// Middleware
const auth = require('./../middleware/auth');

// Utils
const getTotalMonth = require('./../utils/getTotalMonth');

// function shuffle(array) {
// 	array.sort(() => Math.random() - 0.5);
// }

const getCandidates = async (query, status) => {
	let sortBy = '';
	if (status === 'Approve') {
		sortBy = 'dateApproved';
	} else if (status === 'Reject') {
		sortBy = 'dateRejected';
	} else if (status === 'Hire') {
		sortBy = 'dateHired';
	} else {
		sortBy = 'dateCreated';
	}
	let totalWorkYear = {
		min: -1,
		max: -1,
	};
	const searchOR = [];
	const searchAND = [];
	const queryData = {};
	for (const [key, value] of Object.entries(query)) {
		const keyword = value.split(',');
		if (key === 'specialty' || key === 'marketType') {
			searchOR.push({
				[key]: {
					$in: keyword,
				},
			});
		} else if (key === 'software') {
			searchOR.push(
				{
					advancedSoftware: {
						$in: keyword,
					},
				},
				{
					intermediateSoftware: {
						$in: keyword,
					},
				}
			);
		} else if (key === 'experience') {
			keyword.map((e) => {
				if (e === '1-4 years') {
					if (
						totalWorkYear.max < 4 &&
						totalWorkYear.min < 4 &&
						totalWorkYear.max !== 0
					) {
						totalWorkYear.max = 4;
					}

					if (totalWorkYear.min > 1 || totalWorkYear.min === -1) {
						totalWorkYear.min = 1;
					}
				} else if (e === '5-9 years') {
					if (
						totalWorkYear.max < 9 &&
						totalWorkYear.min < 9 &&
						totalWorkYear.max !== 0
					) {
						totalWorkYear.max = 9;
					}

					if (totalWorkYear.min > 5 || totalWorkYear.min === -1) {
						totalWorkYear.min = 5;
					}
				} else if (e === '10-14 years') {
					if (
						totalWorkYear.max < 14 &&
						totalWorkYear.min < 14 &&
						totalWorkYear.max !== 0
					) {
						totalWorkYear.max = 14;
					}

					if (totalWorkYear.min > 10 || totalWorkYear.min === -1) {
						totalWorkYear.min = 10;
					}
				} else if (e === '15-19 years') {
					if (
						totalWorkYear.max < 19 &&
						totalWorkYear.min < 19 &&
						totalWorkYear.max !== 0
					) {
						totalWorkYear.max = 19;
					}

					if (totalWorkYear.min > 15 || totalWorkYear.min === -1) {
						totalWorkYear.min = 15;
					}
				} else {
					if (totalWorkYear.max < 20) {
						totalWorkYear.max = 0;
					}
					if (totalWorkYear.min > 20 || totalWorkYear.min === -1) {
						totalWorkYear.min = 20;
					}
				}
			});
			if (totalWorkYear.max === 0) {
				searchAND.push({
					totalWorkYear: {
						$gte: totalWorkYear.min,
					},
				});
			} else {
				searchAND.push({
					totalWorkYear: {
						$lte: totalWorkYear.max,
						$gte: totalWorkYear.min,
					},
				});
			}
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else if (key === 'country') {
			searchAND.push({
				countryExperience: {
					$in: keyword,
				},
			});
		} else if (key === 'salary') {
			searchAND.push({
				expectedSalary: {
					$in: keyword,
				},
			});
		} else if (key === 'search') {
			Object.assign(queryData, { $text: { $search: value } });
		} else {
			searchAND.push({
				[key]: {
					$in: keyword,
				},
			});
		}
	}

	if (searchOR.length > 0) {
		Object.assign(queryData, { $or: [...searchOR] });
	}

	Object.assign(queryData, ...searchAND);
	let candidates = await Resume.find({
		...queryData,
		status,
	}).sort({ [sortBy]: -1 });
	// shuffle(candidates);
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

	if (endIndex < candidates.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	results.total = candidates.length;

	results.candidates = candidates.slice(startIndex, endIndex);
	// res.json(results);
	return results;
};

// @route   GET /api/candidate/view-candidates
// @desc    Get approve candidates
// @access  Private
router.get('/view-candidates', async (req, res) => {
	const results = await getCandidates(req.query, 'Approve');
	res.json(results);
});

// @route   GET /api/candidate/new-applicants
// @desc    Get pending candidates
// @access  Private
router.get('/new-applicants', async (req, res) => {
	const results = await getCandidates(req.query, 'Pending');
	res.json(results);
});

// @route   GET /api/candidate/approved-applicants
// @desc    Get approve candidates
// @access  Private
router.get('/approved-applicants', auth, async (req, res) => {
	const results = await getCandidates(req.query, 'Approve');
	res.json(results);
});

// @route   GET /api/candidate/hired-applicants
// @desc    Get hire candidates
// @access  Private
router.get('/hired-applicants', auth, async (req, res) => {
	const results = await getCandidates(req.query, 'Hire');
	res.json(results);
});

// @route   GET /api/candidate/rejected-applicants
// @desc    Get reject candidates
// @access  Private
router.get('/rejected-applicants', auth, async (req, res) => {
	const results = await getCandidates(req.query, 'Reject');
	res.json(results);
});

// @route   PUT /api/candidate/recruiters-comment
// @desc    Recruiters comment
// @access  Private
router.put('/recruiters-comment', auth, async (req, res) => {
	const { _id, recruitmentsComment } = req.body;
	await Resume.findByIdAndUpdate(_id, {
		...req.body,
		recruitmentsComment,
	});
});

// @route	PUT /api/candidate/update-resume
// @desc	Update resume
// @access	Private
router.put('/update-resume/:id', async (req, res) => {
	const { id } = req.params;
	const { workHistory } = req.body;
	let error = false;
	let totalWorkHistory = 0;
	workHistory.map((e) => {
		const date1 = getTotalMonth(e.monthStarted, 1, e.yearStarted, 'MM/DD/YYYY');
		const date2 = getTotalMonth(e.monthEnded, 1, e.yearEnded, 'MM/DD/YYYY');
		const totalMonth = date2.diff(date1, 'month');
		if (totalMonth < 0) {
			error = true;
			return res.status(400).json({ msg: 'Invalid Date' });
		}
		totalWorkHistory += totalMonth;
	});

	if (!error) {
		totalWorkHistory /= 12;
		// to convert decimal into whole number.
		totalWorkHistory = Math.floor(totalWorkHistory);

		await Resume.findByIdAndUpdate(id, {
			...req.body,
			totalWorkYear: totalWorkHistory,
		});
	}
});

// @route	DELETE /api/candidate/remove-sample-work
// @desc	Remove sample work
// @access	Private
router.delete('/remove-sample-work/:id/:file/:type', auth, async (req, res) => {
	const { id, file, type } = req.params;
	const resume = await Resume.findById(id);
	const newFile = resume.uploadWork[type].filter((f) => f.file !== file);
	await Resume.findByIdAndUpdate(id, {
		uploadWork: {
			...resume.uploadWork,
			[type]: newFile,
		},
	});
	if (fs.existsSync(`${__dirname}/../public/uploads/${file}`)) {
		fs.unlink(`${__dirname}/../public/uploads/${file}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}
	res.json({ type, arr: newFile });
});

// @route   PUT /api/candidate/approve-resume
// @desc    Approve resume
// @access  Private
router.put('/approve-resume', auth, async (req, res) => {
	const { _id } = req.body;
	const resume = await Resume.findByIdAndUpdate(_id, {
		...req.body,
		status: 'Approve',
		dateApproved: Date.now(),
	});
	res.json(resume);
});

// @route   PUT /api/candidate/hire-resume
// @desc    Hire resume
// @access  Private
router.put('/hire-resume', auth, async (req, res) => {
	const { _id } = req.body;
	const resume = await Resume.findByIdAndUpdate(_id, {
		...req.body,
		status: 'Hire',
		dateHired: Date.now(),
	});
	res.json(resume);
});

// @route   PUT /api/candidate/reject-resume
// @desc    Reject resume
// @access  Private
router.put('/reject-resume', auth, async (req, res) => {
	const { _id } = req.body;
	const resume = await Resume.findByIdAndUpdate(_id, {
		...req.body,
		status: 'Reject',
		dateRejected: Date.now(),
	});
	res.json(resume);
});

// @route   DELETE /api/candidate/delete-resume
// @desc    Delete resume
// @access  Private
router.delete('/delete-resume/:id', auth, async (req, res) => {
	const { id } = req.params;
	let resume = await Resume.findById(id);
	const {
		resumeImage,
		// internetResult,
		// computerSpecs,
		aboutYourself,
		govID,
		cv,
		uploadWork,
		user,
	} = resume;

	// Resume Image
	if (fs.existsSync(`${__dirname}/../public/uploads/${resumeImage}`)) {
		fs.unlink(`${__dirname}/../public/uploads/${resumeImage}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}
	// fs.unlink(`${__dirname}/../public/uploads/${internetResult}`, (err) => {
	// 	if (err) {
	// 		console.error(err);
	// 		return;
	// 	}
	// });
	// fs.unlink(`${__dirname}/../public/uploads/${computerSpecs}`, (err) => {
	// 	if (err) {
	// 		console.error(err);
	// 		return;
	// 	}
	// });

	// About Yourself
	if (fs.existsSync(`${__dirname}/../public/uploads/${aboutYourself}`)) {
		fs.unlink(`${__dirname}/../public/uploads/${aboutYourself}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}

	// Gov ID
	if (fs.existsSync(`${__dirname}/../public/uploads/${govID}`)) {
		fs.unlink(`${__dirname}/../public/uploads/${govID}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}

	// CV
	if (fs.existsSync(`${__dirname}/../public/uploads/${cv}`)) {
		fs.unlink(`${__dirname}/../public/uploads/${cv}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	}

	// Upload Work - Images
	if (uploadWork.images.length !== 0) {
		uploadWork.images.map((e) => {
			if (fs.existsSync(`${__dirname}/../public/uploads/${e.file}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
		});
	}

	// Upload Work - Documents
	if (uploadWork.documents.length !== 0) {
		uploadWork.documents.map((e) => {
			if (fs.existsSync(`${__dirname}/../public/uploads/${e.file}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
		});
	}

	await User.findByIdAndDelete(user);
	await Resume.findByIdAndDelete(id);
	return res.json({ success: true });
});

// @route   POST /api/candidate/view-resume
// @desc    View resume
// @access  Private
router.post('/view-resume', async (req, res) => {
	const { id } = req.body;
	const resume = await Resume.findById(id);
	res.json(resume);
});

// @route   POST /api/candidate/shortlisted
// @desc    Get shortlist info
// @access  Public
router.post('/shortlisted', async (req, res) => {
	try {
		const shortlisted = await Resume.find()
			.where('_id')
			.in(req.body.shortlisted);
		res.json(shortlisted);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
