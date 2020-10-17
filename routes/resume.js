const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const path = require('path');
const fs = require('fs');
const gm = require('gm');
const pdf = require('pdf-thumbnail');
const moment = require('moment');

// Models
const Resume = require('./../models/Resume');

// Middleware
const auth = require('./../middleware/auth');

// @route   POST /api/resume
// @desc    Create resume
// @access  Private
router.post('/', auth, async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		cellphone,
		city,
		country,
		linkedIn,
		internetType,
		internetResult,
		havePC,
		// availability,
		expectedSalary,
		// currency,
		headline,
	} = req.body;
	let { specialty, software, education, workHistory, uploadWork } = req.body;
	let uploadFile = req.files;
	education = JSON.parse(education);
	workHistory = JSON.parse(workHistory);
	uploadWork = JSON.parse(uploadWork);

	Date.monthsDiff = function (day1, day2) {
		let d1 = day1,
			d2 = day2;
		if (day1 < day2) {
			d1 = day2;
			d2 = day1;
		}
		let m =
			(d1.getFullYear() - d2.getFullYear()) * 12 +
			(d1.getMonth() - d2.getMonth());
		if (d1.getDate() < d2.getDate()) --m;
		return m;
	};

	let totalWorkHistory = 0;
	workHistory.map((e) => {
		let d1 = new Date(
			e.yearStarted,
			parseInt(moment().month(e.monthStarted).format('M'))
		);
		let d2 = new Date(
			e.yearEnded,
			parseInt(moment().month(e.monthEnded).format('M'))
		);
		totalWorkHistory += Date.monthsDiff(d1, d2);
	});

	specialty = specialty.split(',');
	software = software.split(',');

	const generateFileName = (file, fieldname) => {
		const filename = randomstring.generate({
			length: 6,
			charset: 'numeric',
		});
		return `${fieldname}-${filename}-${Date.now()}${path.extname(
			file.name
		)}`;
	};

	let resumeImage = uploadFile.resumeImage;
	const resumeImageFile = generateFileName(resumeImage, 'resumeImage');
	resumeImage.mv(
		`${__dirname}/../public/uploads/${resumeImageFile}`,
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).send(err);
			}
		}
	);
	resumeImage = resumeImageFile;

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

	let uploadWorkImage = '';
	if (uploadWork.images.length > 1) {
		uploadFile.images.forEach((element) => {
			const uploadWorkImageFile = generateFileName(
				element,
				'uploadWorkImage'
			);
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
		const uploadWorkImageFile = generateFileName(
			uploadFile.images,
			'images'
		);
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
		uploadWork.images = uploadWork.images.map((x, i) => {
			return {
				...x,
				file:
					uploadWork.images.length > 1
						? uploadWorkImage[i]
						: uploadWorkImage,
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
			cellphone,
			city,
			country,
			linkedIn,
			resumeImage,
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
			education,
			workHistory,
			countryExperience,
			specialty,
			software,
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
