const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');

// Models
const Resume = require('./../models/Resume');
const User = require('./../models/User');

// Middleware
const auth = require('./../middleware/auth');

function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

// @route   GET /api/candidate/view-candidates
// @desc    Get approve candidates
// @access  Private
router.get('/view-candidates', async (req, res) => {
	const query = req.query;
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
	// for (const [key, value] of Object.entries(query)) {
	// 	if (key === 'specialty') {
	// 		if (value.split(',').length > 1) {
	// 			queryData = {
	// 				...queryData,
	// 				[key]: {
	// 					$in: value.split(','),
	// 				},
	// 			};
	// 		} else {
	// 			queryData = {
	// 				...queryData,
	// 				[key]: {
	// 					$in: value,
	// 				},
	// 			};
	// 		}
	// 	} else if (key === 'software') {
	// 		if (value.split(',').length > 1) {
	// 			queryData = {
	// 				...queryData,
	// 				// advancedSoftware: {
	// 				// 	$in: value.split(','),
	// 				// },
	// 				// intermediateSoftware: {
	// 				// 	$in: value.split(','),
	// 				// },
	// 				$or: [
	// 					{
	// 						advancedSoftware: {
	// 							$in: value.split(','),
	// 						},
	// 					},
	// 					{
	// 						intermediateSoftware: {
	// 							$in: value.split(','),
	// 						},
	// 					},
	// 				],
	// 			};
	// 		} else {
	// 			queryData = {
	// 				...queryData,
	// 				$or: [{ advancedSoftware: value }, { intermediateSoftware: value }],
	// 			};
	// 		}
	// 	} else if (key === 'search') {
	// 		queryData = {
	// 			...queryData,
	// 			$or: [
	// 				{ specialty: { $regex: value, $options: 'i' } },
	// 				{ software: { $regex: value, $options: 'i' } },
	// 			],
	// 		};
	// 	} else if (key === 'experience') {
	// 		if (value === '1-4 years') {
	// 			queryData = {
	// 				...queryData,
	// 				totalWorkYear: {
	// 					$lte: 4,
	// 					$gte: 1,
	// 				},
	// 			};
	// 		} else if (value === '5-9 years') {
	// 			queryData = {
	// 				...queryData,
	// 				totalWorkYear: {
	// 					$lte: 9,
	// 					$gte: 5,
	// 				},
	// 			};
	// 		} else if (value === '10-14 years') {
	// 			queryData = {
	// 				...queryData,
	// 				totalWorkYear: {
	// 					$lte: 14,
	// 					$gte: 10,
	// 				},
	// 			};
	// 		} else if (value === '15+ years') {
	// 			queryData = {
	// 				...queryData,
	// 				totalWorkYear: {
	// 					$gte: 15,
	// 				},
	// 			};
	// 		}
	// 	} else if (key === 'country') {
	// 		queryData = {
	// 			...queryData,
	// 			countryExperience: { $regex: value, $options: 'i' },
	// 		};
	// 	} else if (key === 'page' || key === 'limit') {
	// 		continue;
	// 	} else {
	// 		queryData = { ...queryData, [key]: value };
	// 	}
	// }

	// const candidates = await Resume.aggregate([
	// 	{ $match: { ...queryData, status: 'Approve' } },
	// 	{ $sample: { size: parseInt(query.limit) || 10 } },
	// ]);
	let candidates = await Resume.find({
		...queryData,
		status: 'Approve',
	});
	shuffle(candidates);
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
	res.json(results);
});

// @route   GET /api/candidate/new-applicants
// @desc    Get pending candidates
// @access  Private
router.get('/new-applicants', async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: value.split(',') };
			} else {
				queryData = { ...queryData, [key]: value };
			}
		} else if (key === 'software') {
			if (value.split(',').length > 1) {
				queryData = {
					...queryData,
					$or: [
						{ advancedSoftware: value.split(',') },
						{ intermediateSoftware: value.split(',') },
					],
				};
			} else {
				queryData = {
					...queryData,
					$or: [{ advancedSoftware: value }, { intermediateSoftware: value }],
				};
			}
		} else if (key === 'search') {
			console.log(value);
			queryData = {
				...queryData,
				$or: [
					{ specialty: { $regex: value, $options: 'i' } },
					{ software: { $regex: value, $options: 'i' } },
				],
			};
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			queryData = { ...queryData, [key]: value };
		}
	}
	const candidates = await Resume.find({ ...queryData, status: 'Pending' });
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
	res.json(results);
});

// @route   GET /api/candidate/approved-applicants
// @desc    Get approve candidates
// @access  Private
router.get('/approved-applicants', auth, async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: value.split(',') };
			} else {
				queryData = { ...queryData, [key]: value };
			}
		} else if (key === 'software') {
			if (value.split(',').length > 1) {
				queryData = {
					...queryData,
					$or: [
						{ advancedSoftware: value.split(',') },
						{ intermediateSoftware: value.split(',') },
					],
				};
			} else {
				queryData = {
					...queryData,
					$or: [{ advancedSoftware: value }, { intermediateSoftware: value }],
				};
			}
		} else if (key === 'search') {
			queryData = {
				...queryData,
				$or: [
					{ specialty: new RegExp(`^${value}$`, 'i') },
					{ advancedSoftware: new RegExp(`^${value}$`, 'i') },
					{ intermediateSoftware: new RegExp(`^${value}$`, 'i') },
				],
			};
		} else if (key === 'page' || key === 'limit') {
			continue;
		} else {
			queryData = { ...queryData, [key]: value };
		}
	}
	const candidates = await Resume.find({ ...queryData, status: 'Approve' });
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
	res.json(results);
});

// @route   GET /api/candidate/rejected-applicants
// @desc    Get reject candidates
// @access  Private
router.get('/rejected-applicants', auth, async (req, res) => {
	const query = req.query;
	let queryData = {};
	for (const [key, value] of Object.entries(query)) {
		if (key === 'specialty') {
			if (value.split(',').length > 1) {
				queryData = { ...queryData, [key]: { $in: value.split(',') } };
			} else {
				queryData = { ...queryData, [key]: { $in: value } };
			}
		} else if (key === 'software') {
			if (value.split(',').length > 1) {
				queryData = {
					...queryData,
					$or: [
						{ advancedSoftware: value.split(',') },
						{ intermediateSoftware: value.split(',') },
					],
				};
			} else {
				queryData = {
					...queryData,
					$or: [{ advancedSoftware: value }, { intermediateSoftware: value }],
				};
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
	const candidates = await Resume.find({ ...queryData, status: 'Reject' });
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

// @route   PUT /api/candidate/approve-resume
// @desc    Approve resume
// @access  Private
router.put('/approve-resume', auth, async (req, res) => {
	const { _id } = req.body;
	const resume = await Resume.findByIdAndUpdate(_id, {
		...req.body,
		status: 'Approve',
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
	fs.unlink(`${__dirname}/../public/uploads/${resumeImage}`, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
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
	fs.unlink(`${__dirname}/../public/uploads/${aboutYourself}`, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
	fs.unlink(`${__dirname}/../public/uploads/${govID}`, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});
	fs.unlink(`${__dirname}/../public/uploads/${cv}`, (err) => {
		if (err) {
			console.error(err);
			return;
		}
	});

	uploadWork.images.map((e) => {
		fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
	});

	// uploadWork.documents.map((e) => {
	// 	fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return;
	// 		}
	// 	});
	// });
	await User.findByIdAndDelete(user);
	await Resume.findByIdAndDelete(id);
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
