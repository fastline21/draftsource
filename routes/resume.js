const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const path = require('path');
const moment = require('moment');

// Models
const Resume = require('./../models/Resume');

// Middleware
const auth = require('./../middleware/auth');

router.post('/education', async (req, res) => {
	let { education } = req.body;
	const licenseArr = [];
	education.map((e) => {
		if (e.choices === 'License and Certification') {
			licenseArr.push(e.license);
		}
	});
	const oldEducation = education.filter(
		(edu) => edu.choices !== 'License and Certification'
	);
	const newEducation = [
		...oldEducation,
		{
			choices: 'License and Certification',
			license: licenseArr,
		},
	];
	console.log(newEducation);
	res.json(newEducation);
});

router.post('/exp', async (req, res) => {
	const { workHistory } = req.body;
	let totalWorkHistory = 0;
	workHistory.map((e) => {
		let d2 = moment([
			e.yearStarted,
			moment().month(e.monthStarted).format('MM'),
			01,
		]);
		let d1 = moment([
			e.yearEnded,
			moment().month(e.monthEnded).format('MM'),
			01,
		]);
		totalWorkHistory += d1.diff(d2, 'year');
	});
	res.json(totalWorkHistory);
});

// @route   POST /api/resume
// @desc    Create resume
// @access  Private
router.post('/', auth, async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		age,
		gender,
		cellphone,
		city,
		// country,
		linkedIn,
		internetType,
		internetResult,
		havePC,
		// availability,
		expectedSalary,
		// currency,
		headline,
	} = req.body;
	let {
		specialty,
		software,
		marketType,
		education,
		workHistory,
		uploadWork,
	} = req.body;
	let uploadFile = req.files;
	education = JSON.parse(education);
	workHistory = JSON.parse(workHistory);
	uploadWork = JSON.parse(uploadWork);

	// Combine all license into one entry
	const licenseArr = [];
	education.map((e) => {
		if (e.choices === 'License and Certification') {
			licenseArr.push(e.license);
		}
	});
	const oldEducation = education.filter(
		(edu) => edu.choices !== 'License and Certification'
	);
	const newEducation = [
		...oldEducation,
		{
			choices: 'License and Certification',
			license: licenseArr,
		},
	];

	// Get duration of years
	// Date.monthsDiff = function (day1, day2) {
	// 	let d1 = day1,
	// 		d2 = day2;
	// 	if (day1 < day2) {
	// 		d1 = day2;
	// 		d2 = day1;
	// 	}
	// 	let m =
	// 		(d1.getFullYear() - d2.getFullYear()) * 12 +
	// 		(d1.getMonth() - d2.getMonth());
	// 	if (d1.getDate() < d2.getDate()) --m;
	// 	return m;
	// };

	// Get total work history
	let totalWorkHistory = 0;
	workHistory.map((e) => {
		let d2 = moment([
			e.yearStarted,
			moment().month(e.monthStarted).format('MM'),
			01,
		]);
		let d1 = moment([
			e.yearEnded,
			moment().month(e.monthEnded).format('MM'),
			01,
		]);
		totalWorkHistory += d1.diff(d2, 'year');
	});

	// string to array
	specialty = specialty.split(',');
	software = software.split(',');
	marketType = marketType.split(',');

	// Generate file name for upload
	const generateFileName = (file, fieldname) => {
		const filename = randomstring.generate({
			length: 6,
			charset: 'numeric',
		});
		return `${fieldname}-${filename}-${Date.now()}${path.extname(file.name)}`;
	};

	// Generate Resume Image
	let resumeImage = uploadFile.resumeImage;
	const resumeImageFile = generateFileName(resumeImage, 'resumeImage');
	resumeImage.mv(`${__dirname}/../public/uploads/${resumeImageFile}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	});
	resumeImage = resumeImageFile;

	// Generate Gov ID
	let govID = uploadFile.govID;
	const govIDFile = generateFileName(govID, 'govID');
	govID.mv(`${__dirname}/../public/uploads/${govIDFile}`, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}
	});
	govID = govIDFile;

	// Get all country in Work History and remove duplicate
	let countryExperience = workHistory.map((e) => e.country);
	countryExperience = countryExperience.filter(
		(a, b) => countryExperience.indexOf(a) === b
	);

	// let internetResult = uploadFile.internetResult;
	// const internetResultFile = generateFileName(
	// 	internetResult,
	// 	'internetResult'
	// );
	// internetResult.mv(
	// 	`${__dirname}/../public/uploads/${internetResultFile}`,
	// 	(err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return res.status(500).send(err);
	// 		}
	// 	}
	// );
	// internetResult = internetResultFile;

	// let computerSpecs = uploadFile.computerSpecs;
	// const computerSpecsFile = generateFileName(computerSpecs, 'computerSpecs');
	// computerSpecs.mv(
	// 	`${__dirname}/../public/uploads/${computerSpecsFile}`,
	// 	(err) => {
	// 		if (err) {
	// 			console.error(err);
	// 			return res.status(500).send(err);
	// 		}
	// 	}
	// );
	// computerSpecs = computerSpecsFile;

	// Generate About Yourself file
	let aboutYourself = uploadFile.aboutYourself;
	const aboutYourselfFile = generateFileName(aboutYourself, 'aboutYourself');
	aboutYourself.mv(
		`${__dirname}/../public/uploads/${aboutYourselfFile}`,
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}
		}
	);
	aboutYourself = aboutYourselfFile;

	// Generate Upload Work Images
	let uploadWorkImage = '';
	if (uploadWork.images.length > 1) {
		uploadFile.images.forEach((element) => {
			const uploadWorkImageFile = generateFileName(element, 'uploadWorkImage');
			element.mv(
				`${__dirname}/../public/uploads/${uploadWorkImageFile}`,
				(err) => {
					if (err) {
						console.error(err);
						return res.status(500).send(err);
					}
				}
			);
			uploadWorkImage = [...uploadWorkImage, uploadWorkImageFile];
		});
	} else {
		const uploadWorkImageFile = generateFileName(uploadFile.images, 'images');
		uploadFile.images.mv(
			`${__dirname}/../public/uploads/${uploadWorkImageFile}`,
			(err) => {
				if (err) {
					console.error(err);
					return res.status(500).send(err);
				}
			}
		);
		uploadWorkImage = uploadWorkImageFile;
	}

	// let uploadWorkDocument = '';
	// if (uploadWork.documents.length > 1) {
	//     uploadFile.documents.forEach((element) => {
	//         const uploadWorkDocumentFile = generateFileName(
	//             element,
	//             'uploadWorkDocument'
	//         );
	//         element.mv(
	//             `${__dirname}/../public/uploads/${uploadWorkDocumentFile}`,
	//             (err) => {
	//                 if (err) {
	//                     console.error(err);
	//                     return res.status(500).send(err);
	//                 }
	//             }
	//         );
	//         uploadWorkDocument = [
	//             ...uploadWorkDocument,
	//             uploadWorkDocumentFile,
	//         ];
	//     });
	// } else {
	//     const uploadWorkDocumentFile = generateFileName(
	//         uploadFile.documents,
	//         'documents'
	//     );
	//     uploadFile.documents.mv(
	//         `${__dirname}/../public/uploads/${uploadWorkDocumentFile}`,
	//         (err) => {
	//             if (err) {
	//                 console.error(err);
	//                 return res.status(500).send(err);
	//             }
	//         }
	//     );
	//     uploadWorkDocument = uploadWorkDocumentFile;
	// }

	try {
		// Combine Upload Work Images file to array
		uploadWork.images = uploadWork.images.map((x, i) => {
			return {
				...x,
				file:
					uploadWork.images.length > 1 ? uploadWorkImage[i] : uploadWorkImage,
			};
		});

		// uploadWork.documents = uploadWork.documents.map((x, i) => {
		//     return {
		//         ...x,
		//         file:
		//             uploadWork.documents.length > 1
		//                 ? uploadWorkDocument[i]
		//                 : uploadWorkDocument,
		//     };
		// });

		const resumeFields = {
			user: req.user.id,
			firstName,
			lastName,
			email,
			age,
			gender,
			cellphone,
			city,
			// country,
			linkedIn,
			resumeImage,
			govID,
			internetType,
			internetResult,
			hardwareType: havePC ? req.body.hardwareType : '',
			brandName: havePC ? req.body.brandName : '',
			processor: havePC ? req.body.processor : '',
			ram: havePC ? req.body.ram : '',
			// computerSpecs,
			// availability,
			expectedSalary,
			// currency,
			aboutYourself,
			education: newEducation,
			workHistory,
			countryExperience,
			specialty,
			software,
			marketType,
			uploadWork,
			headline,
			totalWorkYear: Math.floor(totalWorkHistory / 12),
		};
		const resume = new Resume(resumeFields);
		await resume.save();
		res.json(resume);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
