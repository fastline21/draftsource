const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

// Models
const User = require('./../models/User');
const Admin = require('./../models/Admin');

// Config
const { sendEmail } = require('./../config/mailer');

// Middleware
const auth = require('./../middleware/auth');

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

// @route   POST /api/auth
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
	const { type } = req.body;

	if (type === 'Remote Worker') {
		const { email } = req.body;

		if (email === '') {
			return res
				.status(400)
				.json({ msg: 'Please fill-in the required boxes to Proceed.' });
		} else {
			try {
				const { firstName, lastName } = req.body;
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
				res.json(user);
				const compose = `
                        Hi ${firstName} ${lastName}<br /><br />
                        Someone has used your email to engage in Employment Activities, if this is your email click the link below to get started
                        <br /><br />
                        <a href="https://draftsourcevirtual.com/verify/${verificationToken}">https://draftsourcevirtual.com/verify/${verificationToken}</a>
                        <br /><br />
                        <span style="color: red;">PLEASE TAKE TIME TO FOLLOW THE INSTRUCTIONS, NON COMPLIANCE WILL RESULT TO AUTOMATIC PROFILE REJECTION</span>
                        <br /><br />
                        <span style="color: red;">GOLDEN RULE #1 = NEVER FAKE YOUR PROFILE, FAKING OF PROFILES WILL RESULT TO BEING BANNED FROM APPLYING WITH DRAFTSOURCE VIRTUAL</span>
                        <br /><br />
                        <span style="color: red;">Watch the video for proper instructions:</span> Watch Video<br />
                        Password: 4321
                        <br /><br />
                        <br />
                        <strong>Step 2</strong><br />
                        - Make a well lit, professional clear headshot<br />
                        - No half/full body shots<br />
                        - No selfies and no unprofessional headshots (This is a CV - Profile)
                        <br /><br />
                        <strong>Step 3</strong><br />
                        - Upload all photos not more than 5 min<br />
                        - 8GB RAM minimum for 2D and 16 GB RAM minimum for 3D<br />
                        - Do not crop your screenshots make sure the time is included in the photo
                        <br /><br />
                        <strong>Step 4</strong><br />
                        - Full-time work = 40 hours per week and Part-time work = 20 hours per week<br />
                        - You may use vocaroo.com for video recording<br />
                        - Do not say hi, hello, hey and uhm in any part of the video<br />
                        - Make the audio clear and avoid disturbing background noises<br />
                        - Do not include name, email and personal details<br />
                        - Headlines should be your core competencies
                        <br /><br />
                        <strong>Please follow the format for the 60 sec.</strong><br />
                        Introduction <br />
                        " I am a _______ and a _______. I have been in the industry for over _____ years and I have handled projects such as __________. My best project was completing a ________ for ________ and a ________ for _________. I am skilled at __________. + <strong>Include Final Pitch</strong>
                        <br /><br />
                        <strong>Final Pitch Samples</strong><br />
                        " I have experience running an Interior Design Firm of 10 people and I have generated over P100M in sales in 4 years as CEO of the company. "
                        <br /><br />
                        " I have led a team of 14 drafters while working for Australian and US companies for over 6 years " 
                        <br /><br />
                        " I was awarded as the best CAD Manager for 6 consecutive years with a US Based Engineering Company" 
                        <br /><br />
                        <strong>Sample Voice Recordings</strong><br />
                        “I am a licensed mechanical engineer and  I have been in the industry for over 15 years and worked as a senior mechanical draftsman for 8 years for a global engineering company and I have handled multiple complex projects such as hotels, resorts, and malls. My best project was designing/drafting a 60 story residential condominium and a 2000 sqm packaging manufacturing plant. I am skilled at using Revit, AutoCAD and Quantity Surveying. I have a led a team of 14 drafters while working for Australian and US companies for over 6 years.” 
                        <br /><br />
                        “I am a furniture maker and a general contractor. I have been in the industry for over 4 years and I have handled complex interior renovation projects such as hotels, resorts, malls, restaurants and offices. My biggest accomplishment was completing the 500sqm office of Red Bull Philippines and connecting 407m of HDPE pipes via Horizontal Directional Drilling for Manila Water. I am skilled at manufacturing solid wood, outdoor weaved, kitchen cabinetry, metal works, sofas and upholstered furniture. I have experience running an interior design firm of 10 people and I have generated P100M in sales over 4 years as Founder and CEO of my company."
                        <br /><br />
                        <strong>Sample Headlines</strong><br /><br />
                        <strong>- Professional Civil Engineer (PE)</strong><br />
                        <strong>- Architect Designer | Civil & Structural Engineer</strong><br />
                        <strong>- Civil Engineer | Civil 3D & AutoCAD Specialist | CAD Designer</strong><br />
                        <strong>- BIM & CAD Expert (Arch/Struct, MEP, Civil, Point Cloud) (US-Based)</strong><br />
                        <strong>- MEP Design Engineer | MEP Estimator | Mechanical Engineer</strong><br />
                        <br />
                        <strong>Step 5</strong><br />
                        - Put your most recent employment history, descending<br />
                        - Do not put irrelevant information such as Worked as a Cook for a Fastfood Restaurant, Franchised Master Siomai, Network Marketer for Usana and Front Row etc.<br />
                        -  Do not include company names in About the company instead change the names to "they" or "the company"<br />
                        - Copy from your company website or company profile<br />
                        <br /><br />
                        <strong>Example About the Company</strong><br />
                        From<br />
                        Spaceplan Furniture & Interiors is a total interior finishing company in the Philippines.<br />
                        We offer end to end solutions from Interior Conceptualization + Design Development + Construction Management Services and Custom Furniture. We cater to Restaurants & Bars, Hotels, Offices, Residential and Hospitality companies.<br />
                        <br />
                        To<br />
                        The company is a total interior finishing company in the Philippines.<br />
                        They offer end to end solutions from Interior Conceptualization + Design Development + Construction Management Services and Custom Furniture. They cater to Restaurants & Bars, Hotels, Offices, Residential and Hospitality companies.<br />
                        <br />
                        <strong style="color: red;">STRICT JOB DESCRIPTION FORMAT</strong><br />
                        <strong>Example</strong><br />
                        • Leads all managers in the organization including construction managers, design managers, and plant managers.
                        <br /><br />
                        <strong>Bullet + Space + Job Description</strong>
                        <br /><br />
                        <strong>Step 6</strong><br />
                        - Include all Software and Skills even not included (press add or enter)<br />
                        - Include at least 3 but put all for keyword search <br />
                        - Include a minimum of 6 best projects (the more the better, the bigger the better)<br />
                        - Put the best project first <br />
                        - Do not include name, email and other information<br />
                        <br />
                        <span style="color: red;">PLEASE TAKE TIME TO FOLLOW THE INSTRUCTIONS, NON COMPLIANCE WILL RESULT TO AUTOMATIC PROFILE REJECTION</span>
                        <br /><br />
                        <span style="color: red;">GOLDEN RULE #1 = NEVER FAKE YOUR PROFILE, FAKING OF PROFILES WILL RESULT TO BEING BANNED FROM APPLYING WITH DRAFTSOURCE VIRTUAL</span>
                        <br /><br />
                        <span style="color: red;">Watch the video for proper instructions:</span> <a href="https://bit.ly/3lF1sX0" target="_blank">Watch Video</a>
                        <br /><br /><br />
                        <strong>FAQ</strong>
                        <strong>1. What are the next steps after creating a profile?</strong><br />
                        Step 1: Profile Verification<br />
                        Step 2: Zoom Call and Pre-screening<br />
                        <br />
                        <strong>2. Who will we be working with?</strong><br />
                        - You will be working with Australian, United States of America, United Kingdom, New Zealand and Canadian Freelancers and SMEs<br />
                        <br />
                        <strong>3. Is there a guarantee that we will get hired if we apply?</strong><br />
                        - There is no risk but there is ZERO chance if you do not apply<br />
                        <br />
                        <strong>4. What will happen if we fake our profiles?</strong><br />
                        - Faking of profiles or inaccurate CV and profiles are automatically banned from applying as an Independent Contractor.<br />
                        <br />
                        <strong>5. What time will we be working?</strong><br />
                        Depending on the client's preferred working hours or their timezones.<br />
                        <br />
                        <strong>6. How long will it take to get hired?</strong><br />
                        - There is no exact answer to this, we are continuously advertising, selling and marketing our services.<br />
                        <br />
                        <strong>7. Are we working as a regular employee?</strong><br />
                        - You will be working as an Independent Contractor <a target="_blank" hreef="https://bit.ly/30XkgIX">https://bit.ly/30XkgIX</a><br />
                        <br />
                        <strong>8. Are we working for Draftsource Virtual?</strong><br />
                        - You will be under our company but you will report directly to your clients and prospective customers.<br />
                        - We are a Recruitment and Staffing company not a CAD Outsourcing Company<br />
                        <br />
                        Final Remarks<br />
                        - This is an application as an independent contractor.<br />
                        - Job opportunities will be presented if you are qualified and accepted as we have strict qualifications and a non-disclosure agreement.<br />
                        <br />
                        <strong>James 1:8-9</strong>
                        “ 8 Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be <strong>prosperous and successful.</strong><br />
                        <br /><br />
                        9 Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.”Create a Resume Access<br />
                        <br /><br />
                        Draftsource Team
                    `;
				let isSuccess = false;
				while (!isSuccess) {
					try {
						await sendEmail(
							'Draftsource BPO <do-not-reply@draftsourcebpo.com>',
							email,
							'Verify Email',
							compose
						);
						isSuccess = true;
					} catch (err) {
						console.error('error:', err);
					}
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
					const newPassword = await bcrypt.hash(
						String(password),
						salt
					);
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
					res.json(user);
					try {
						await sendEmail(
							'Draftsource BPO <do-not-reply@draftsourcebpo.com>',
							email,
							'Verify Email',
							compose
						);
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
					const newPassword = await bcrypt.hash(
						String(password),
						salt
					);
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

					res.json(user);
					let isSuccess = false;
					while (!isSuccess) {
						try {
							await sendEmail(
								'Draftsource BPO <do-not-reply@draftsourcebpo.com>',
								email,
								'Verify Email',
								compose
							);
							isSuccess = true;
						} catch (err) {
							console.error('error:', err);
						}
					}
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
					const newPassword = await bcrypt.hash(
						String(password),
						salt
					);
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
					res.json(user);
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

module.exports = router;
