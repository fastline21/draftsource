const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Models
const User = require('./../models/User');
const Admin = require('./../models/Admin');
const Resume = require('./../models/Resume');
const Temp = require('./../models/Temp');
const Job = require('../models/Job');

// Config
const { sendEmail } = require('./../config/mailer');

// Middleware
const auth = require('./../middleware/auth');
const e = require('express');

// @route   GET /api/auth
// @desc    Load user
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select(
			'-password -verificationToken -dateCreated -active'
		);
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
	// Get type
	const { type } = req.body;

	if (type === 'Remote Worker') {
		// Get email
		const { email } = req.body;

		if (email === '') {
			return res
				.status(400)
				.json({ msg: 'Please fill-in the required boxes to Proceed.' });
		} else {
			try {
				const {
					firstName,
					lastName,
					email,
					cellphone,
					age,
					gender,
					city,
					// country,
					linkedIn,
					recruiterName,
				} = req.body;
				let user = await User.findOne({ email });
				if (user) {
					return res.status(400).json({ msg: 'Email already used' });
				}
				const verificationToken = randomstring.generate();
				user = new User({
					email,
					password: '',
					type,
					verificationToken,
				});
				await user.save();

				const temp = new Temp({
					user: user._id,
					firstName,
					lastName,
					email,
					cellphone,
					age,
					gender,
					city,
					// country,
					linkedIn,
					recruiterName,
				});

				await temp.save();

				// const compose = `
				// 	Hi ${firstName} ${lastName}<br />
				// 	<br />
				// 	Someone has used your email to engage in Employment Activities, if this is your email click the link below to get started<br />
				// 	<br />
				// 	<a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a><br />
				// 	<br />
				// 	<span style="color: red;">WATCH THE SECOND VIDEO FOR PROPER GUIDANCE</span><br />
				// 	<br />
				// 	<span style="color: red;">PLEASE TAKE TIME TO FOLLOW THE INSTRUCTIONS, NON COMPLIANCE WILL RESULT TO AUTOMATIC PROFILE REJECTION</span><br />
				// 	<br />
				// 	<span style="color: red;">GOLDEN RULE #1 = NEVER FAKE YOUR PROFILE, FAKING OF PROFILES WILL RESULT TO BEING BANNED FROM APPLYING WITH DRAFTSOURCE VIRTUAL</span><br />
				// 	<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Step 2</span><br />
				// 	- Make a well lit, professional clear headshot<br />
				// 	- No half/full body shots<br />
				// 	- No selfies and no unprofessional headshots (This is a CV - Profile)<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Step 3</span><br />
				// 	- Upload all photos not more than 5 min<br />
				// 	- 8GB RAM minimum for 2D and 16 GB RAM minimum for 3D<br />
				// 	- Do not crop your screenshots make sure the time is included in the photo<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Step 4</span><br />
				// 	- Full-time work = 40 hours per week and Part-time work = 20 hours per week<br />
				// 	- You may use (vocaroo dot com) for video recording<br />
				// 	- Do not say hi, hello, hey and uhm in any part of the video<br />
				// 	- Make the audio clear and avoid disturbing background noises<br />
				// 	- Do not include name, email and personal details<br />
				// 	- Headlines should be your core competencies<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Please follow the format for the 60 sec.</span><br />
				// 	Introduction
				// 	" I am a _______ and a _______. I have been in the industry for over _____ years and I have handled projects such as __________. My best project was completing a ________ for ________ and a ________ for _________. I am skilled at __________. + <span style="font-weight: bold;">Include Final Pitch</span><br />
				// 	<br />
				// 	<span style="font-weight: bold;">Final Pitch Samples</span><br />
				// 	" I have experience running an Interior Design Firm of 10 people and I have generated over P100M in sales in 4 years as CEO of the company. "<br />
				// 	<br />
				// 	" I have led a team of 14 drafters while working for Australian and US companies for over 6 years "<br />
				// 	<br />
				// 	" I was awarded as the best CAD Manager for 6 consecutive years with a US Based Engineering Company"<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Sample Voice Recordings</span><br />
				// 	“I am a licensed mechanical engineer and  I have been in the industry for over 15 years and worked as a senior mechanical draftsman for 8 years for a global engineering company and I have handled multiple complex projects such as hotels, resorts, and malls. My best project was designing/drafting a 60 story residential condominium and a 2000 sqm packaging manufacturing plant. I am skilled at using Revit, AutoCAD and Quantity Surveying. I have a led a team of 14 drafters while working for Australian and US companies for over 6 years.”<br />
				// 	<br />
				// 	“I am a furniture maker and a general contractor. I have been in the industry for over 4 years and I have handled complex interior renovation projects such as hotels, resorts, malls, restaurants and offices. My biggest accomplishment was completing the 500sqm office of Red Bull Philippines and connecting 407m of HDPE pipes via Horizontal Directional Drilling for Manila Water. I am skilled at manufacturing solid wood, outdoor weaved, kitchen cabinetry, metal works, sofas and upholstered furniture. I have experience running an interior design firm of 10 people and I have generated P100M in sales over 4 years as Founder and CEO of my company."<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Sample Headlines</span><br />
				// 	<br />
				// 	- <span style="font-weight: bold;">Professional Civil Engineer (PE)</span><br />
				// 	- <span style="font-weight: bold;">Architect Designer | Civil & Structural Engineer</span><br />
				// 	- <span style="font-weight: bold;">Civil Engineer | Civil 3D & AutoCAD Specialist | CAD Designer</span><br />
				// 	- <span style="font-weight: bold;">BIM & CAD Expert (Arch/Struct, MEP, Civil, Point Cloud) (US-Based)</span><br />
				// 	- <span style="font-weight: bold;">MEP Design Engineer | MEP Estimator | Mechanical Engineer</span><br />
				// 	<br />
				// 	<span style="font-weight: bold;">Step 5</span><br />
				// 	- Put your most recent employment history, descending<br />
				// 	- Do not put irrelevant information such as Worked as a Cook for a Fastfood Restaurant, Franchised Master Siomai, Network Marketer for Usana and Front Row etc.<br />
				// 	-  Do not include company names in About the company instead change the names to "they" or "the company"<br />
				// 	- Copy from your company website or company profile<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Example About the Company</span><br />
				// 	From<br />
				// 	Spaceplan Furniture & Interiors is a total interior finishing company in the Philippines.<br />
				// 	We offer end to end solutions from Interior Conceptualization + Design Development + Construction Management Services and Custom Furniture. We cater to Restaurants & Bars, Hotels, Offices, Residential and Hospitality companies.<br />
				// 	<br />
				// 	To<br />
				// 	The company is a total interior finishing company in the Philippines.<br />
				// 	They offer end to end solutions from Interior Conceptualization + Design Development + Construction Management Services and Custom Furniture. They cater to Restaurants & Bars, Hotels, Offices, Residential and Hospitality companies.<br />
				// 	<br />
				// 	<span style="font-weight: bold; color: red;">STRICT JOB DESCRIPTION FORMAT</span><br />
				// 	<span style="font-weight: bold;">Example</span><br />
				// 	• Leads all managers in the organization including construction managers, design managers, and plant managers.<br />
				// 	<br />
				// 	<span style="font-weight: bold;">Bullet + Space + Job Description</span><br />
				// 	<br />
				// 	<span style="font-weight: bold;">Step 6</span><br />
				// 	- Include all Software and Skills even not included (press add or enter)<br />
				// 	- Include at least 3 but put all for keyword search<br />
				// 	- Include a minimum of 6 best projects (the more the better, the bigger the better)<br />
				// 	- Put the best project first<br />
				// 	- Do not include name, email and other information<br />
				// 	<br />
				// 	<span style="color: red;">PLEASE TAKE TIME TO FOLLOW THE INSTRUCTIONS, NON COMPLIANCE WILL RESULT TO AUTOMATIC PROFILE REJECTION</span><br />
				// 	<br />
				// 	<span style="color: red;">GOLDEN RULE #1 = NEVER FAKE YOUR PROFILE, FAKING OF PROFILES WILL RESULT TO BEING BANNED FROM APPLYING WITH DRAFTSOURCE VIRTUAL</span><br />
				// 	<br />
				// 	<span style="font-weight: bold;">FAQ</span><br />
				// 	<span style="font-weight: bold;">1. What are the next steps after creating a profile?</span><br />
				// 	Step 1: Profile Verification<br />
				// 	Step 2: Zoom Call and Pre-screening<br />
				// 	<br />
				// 	<span style="font-weight: bold;">2. Who will we be working with?</span><br />
				// 	- You will be working with Australian, United States of America, United Kingdom, New Zealand and Canadian Freelancers and SMEs<br />
				// 	<br />
				// 	<span style="font-weight: bold;">3. Is there a guarantee that we will get hired if we apply?</span><br />
				// 	- There is no risk but there is ZERO chance if you do not apply</span><br />
				// 	<br />
				// 	<span style="font-weight: bold;">4. What will happen if we fake our profiles?</span><br />
				// 	- Faking of profiles or inaccurate CV and profiles are automatically banned from applying as an Independent Contractor.<br />
				// 	<br />
				// 	<span style="font-weight: bold;">5. What time will we be working?</span><br />
				// 	Depending on the client's preferred working hours or their timezones.<br />
				// 	<br />
				// 	<span style="font-weight: bold;">6. How long will it take to get hired?</span><br />
				// 	- There is no exact answer to this, we are continuously advertising, selling and marketing our services.<br />
				// 	<br />
				// 	<span style="font-weight: bold;">7. Are we working as a regular employee?</span><br />
				// 	- You will be working as an Independent Contractor<br />
				// 	<br />
				// 	<span style="font-weight: bold;">8. Are we working for Draftsource Virtual?</span><br />
				// 	- You will be under our company but you will report directly to your clients and prospective customers.<br />
				// 	- We are a Recruitment and Staffing company not a CAD Outsourcing Company<br />
				// 	<br />
				// 	Final Remarks<br />
				// 	- This is an application as an independent contractor.<br />
				// 	- Job opportunities will be presented if you are qualified and accepted as we have strict qualifications and a non-disclosure agreement.<br />
				// 	<br />
				// 	<span style="font-weight: bold;">James 1:8-9</span><br />
				// 	“ 8 Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be <span style="font-weight: bold;">prosperous and successful.</span><br />
				// 	<br />
				// 	9 Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.<br />
				// 	<br />
				// 	Draftsource Team
				// `;
				const compose = `
					Hi ${firstName} ${lastName}<br />
					<br />
					Someone has used your email to engage in Employment Activities, if this is your email click the link below to get started<br />
					<br />
					<a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a><br />
					Draftsource Team
				`;

				try {
					await sendEmail(
						`Draftsource Virtual <${process.env.MAILER_USER}>`,
						email,
						'Verify Email',
						compose
					);
					res.json(user);
				} catch (err) {
					console.error('error:', err);
					res.status(err.responseCode).json({ msg: err.response });
				}
			} catch (error) {
				console.error(error.message);
				return res.status(500).send('Server Error');
			}
		}
	} else if (type === 'Employer') {
		const { email, password, password2 } = req.body;

		if (email === '' || password === '' || password2 === '') {
			return res
				.status(400)
				.json({ msg: 'Please fill-in the required boxes to Proceed.' });
		} else if (password !== password2) {
			return res.status(400).json({ msg: 'Incorrect password' });
		} else {
			try {
				let user = await User.findOne({ email });
				if (user) {
					return res.status(400).json({ msg: 'Email already used' });
				} else {
					const salt = await bcrypt.genSalt(10);
					const newPassword = await bcrypt.hash(String(password), salt);
					const verificationToken = randomstring.generate();
					const user = new User({
						email,
						password: newPassword,
						type,
						verificationToken,
					});
					await user.save();
					const compose = `
                        Someone has used your email to engage in Employment Activities, if this is your email click the link below. 
                        <br /><br />
                        <a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a>
                        
                        <br /><br />
                        Have a great day!<br />
                        Team Draftsource Virtual
                    `;
					try {
						await sendEmail(
							'Draftsource Virtual <do-not-reply@draftsourcevirtual.com>',
							email,
							'Verify Email',
							compose
						);
						res.json(user);
					} catch (err) {
						console.error('error:', err);
					}
				}
			} catch (error) {
				console.error(error.message);
				return res.status(500).send('Server Error');
			}
		}
	} else if (type === 'Recruiter') {
		const { email, password, password2 } = req.body;

		if (email === '' || password === '' || password2 === '') {
			return res
				.status(400)
				.json({ msg: 'Please fill-in the required boxes to Proceed.' });
		} else if (password !== password2) {
			return res.status(400).json({ msg: 'Incorrect password' });
		} else {
			try {
				let user = await User.findOne({ email });
				if (user) {
					return res.status(400).json({ msg: 'Email already used' });
				} else {
					const salt = await bcrypt.genSalt(10);
					const newPassword = await bcrypt.hash(String(password), salt);
					const verificationToken = randomstring.generate();
					user = new User({
						email,
						password: newPassword,
						type,
						verificationToken,
					});
					await user.save();
					const compose = `
                        Someone has used your email to engage in Employment Activities, if this is your email click the link below. 
                        <br /><br />
                        <a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a>
                        
                        <br /><br />
                        Have a great day!<br />
                        Team Draftsource Virtual
                    `;
					try {
						await sendEmail(
							'Draftsource Virtual <do-not-reply@draftsourcevirtual.com>',
							email,
							'Verify Email',
							compose
						);
						res.json(user);
					} catch (err) {
						console.error('error:', err);
					}

					// let isSuccess = false;
					// while (!isSuccess) {
					// 	try {
					// 		await sendEmail(
					// 			'Draftsource Virtual <do-not-reply@draftsourcevirtual.com>',
					// 			email,
					// 			'Verify Email',
					// 			compose
					// 		);
					// 		isSuccess = true;
					// 	} catch (err) {
					// 		console.error('error:', err);
					// 	}
					// }
				}
			} catch (error) {
				console.error(error.message);
				return res.status(500).send('Server Error');
			}
		}
	} else if (type === 'Admin') {
		const { email, password, firstName, lastName, type } = req.body;

		if (
			email === '' ||
			password === '' ||
			firstName === '' ||
			lastName === ''
		) {
			return res
				.status(400)
				.json({ msg: 'Please fill-in the required boxes to Proceed.' });
		} else {
			try {
				let user = await User.findOne({ email });
				if (user) {
					return res.status(400).json({ msg: 'Email already used' });
				} else {
					const salt = await bcrypt.genSalt(10);
					const newPassword = await bcrypt.hash(String(password), salt);
					const verificationToken = randomstring.generate();
					user = new User({
						email,
						password: newPassword,
						type,
						verificationToken,
					});
					await user.save();
					const admin = new Admin({
						user: user.id,
						firstName,
						lastName,
					});
					await admin.save();
					const compose = `
						Hi ${firstName} ${lastName}<br />
						<br />
						Someone has used your email to engage in Employment Activities, if this is your email click the link below to get started<br />
						<br />
						<a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a><br />
						Draftsource Team
					`;

					try {
						await sendEmail(
							`Draftsource Virtual <${process.env.MAILER_USER}>`,
							email,
							'Verify Email',
							compose
						);
						res.json(user);
					} catch (err) {
						console.error('error:', err);
						res.status(err.responseCode).json({ msg: err.response });
					}
				}
			} catch (error) {
				console.error(error.message);
				return res.status(500).send('Server Error');
			}
		}
	}
});

// @route   PUT /api/auth/verify
// @desc    Verify user
// access   Public
router.put('/verify', async (req, res) => {
	const { verificationToken } = req.body;
	let user = await User.findOne({ verificationToken });
	if (!user) {
		return res.status(404).json({ msg: 'No user found ' });
	} else {
		user.active = true;
		user.verificationToken = '';
		await user.save();

		const payload = {
			user: {
				id: user.id,
			},
		};

		jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
			if (err) throw err;

			return res.json({ token });
		});
	}
});

// @route	GET /api/auth/temp
// @desc	Get Temp user
// @access	Private
router.get('/temp/:id', async (req, res) => {
	const { id } = req.params;
	const temp = await Temp.findOne({ user: id });
	const {
		_id,
		firstName,
		lastName,
		email,
		cellphone,
		age,
		gender,
		city,
		// country,
		linkedIn,
		recruiterName,
	} = temp;
	res.json({
		firstName,
		lastName,
		email,
		cellphone,
		age,
		gender,
		city,
		// country,
		linkedIn,
		recruiterName,
	});
	await Temp.findByIdAndDelete(_id);
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	if (email === '' || password === '') {
		return res
			.status(400)
			.json({ msg: 'Please fill-in the required boxes to Proceed.' });
	} else {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'No user found' });
		} else {
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: 'Invalid Credentials' });
			} else {
				const payload = {
					user: {
						id: user.id,
					},
				};
				jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
					if (err) throw err;
					return res.json({ token });
				});
			}
		}
	}
});

// @route   GET /api/auth/get-user-info
// @desc    Get user info
// @access  Private
router.get('/get-user-info', auth, async (req, res) => {
	const { id } = req.user;
	const user = await User.findById(id);
	if (user.type === 'Admin') {
		const admin = await Admin.findOne({ user: id }).select(
			'firstName lastName -_id'
		);
		return res.json(admin);
	}
});

// @route   GET /api/auth/get-users
// @desc    Get all users
// @access  Private
router.get('/get-users', auth, async (req, res) => {
	const users = await User.find().sort({ dateCreated: 1 });
	const query = req.query;
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

	if (endIndex < users.length) {
		results.next = {
			page: page + 1,
			limit,
		};
	}

	const resultUsers = [];
	for (const user of users) {
		const { active, _id, email, type, dateCreated } = user;
		const resume = await Resume.findOne({ user: _id });
		resultUsers.push({
			active,
			_id,
			email,
			type,
			dateCreated,
			haveResume: resume ? true : false,
		});
	}
	results.total = resultUsers.length;
	results.users = resultUsers.slice(startIndex, endIndex);
	res.json(results);
});

// @route	DELETE /api/auth/delete-user
// @desc	Delete user
// @access	Private
router.delete('/delete-user/:id', auth, async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);

	if (user.type === 'Remote Worker') {
		const resume = await Resume.findOne({ user: id });

		if (resume) {
			const { resumeImage, aboutYourself, uploadWork, govID, cv } = resume;
			if (fs.existsSync(`${__dirname}/../public/uploads/${resumeImage}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${resumeImage}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			if (fs.existsSync(`${__dirname}/../public/uploads/${aboutYourself}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${aboutYourself}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			if (fs.existsSync(`${__dirname}/../public/uploads/${cv}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${cv}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}
			if (fs.existsSync(`${__dirname}/../public/uploads/${govID}`)) {
				fs.unlink(`${__dirname}/../public/uploads/${govID}`, (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
			}

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
			// await Resume.findByIdAndDelete(_id);
			await resume.delete();
		}
	} else if (user.type === 'Employer') {
		await Job.findOneAndDelete({ user: id });
	}

	// await User.findByIdAndDelete(id);
	await user.delete();
	return res.json(user);
});

module.exports = router;
