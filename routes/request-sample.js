const express = require('express');
const router = express.Router();

// Models
const RequestSample = require('./../models/RequestSample');

// Config
const { sendEmail } = require('./../config/mailer');

// @route   POST /api/request-sample
// @desc    Add Request sample
// @access  Public
router.post('/', async (req, res) => {
	const {
		fullName,
		businessEmail,
		mobileNumber,
		companyName,
		website,
		country,
	} = req.body;
	if (
		fullName === '' ||
		businessEmail === '' ||
		mobileNumber === '' ||
		companyName === '' ||
		website === '' ||
		country === ''
	) {
		return res
			.status(400)
			.json({ msg: 'Please fill-in the required boxes to Proceed.' });
	}
	try {
		const requestSample = new RequestSample({
			fullName,
			businessEmail,
			mobileNumber,
			companyName,
			website,
			country,
		});
		await requestSample.save();
		res.json(requestSample);
		const compose = `
			${fullName},<br />
			<br />
			<span style="font-weight: bold;">Refer to the attachments below for sample projects and pricing.</span><br />
			<br />
			Here's my booking link for a 30 min staffing consultation if you want to move forward or email back using this thread for questions or concerns.<br />
			<a href="https://calendly.com/carlosalison/30min" target="_blank">https://calendly.com/carlosalison/30min</a><br />
			<br />
			Regards,<br />
			<br />
			Alison Carlos<br />
			Managing Director<br />
			Draftsource Global Consulting Services Inc.<br />
			LinkedIn: <a href="https://www.linkedin.com/in/alisoncarlos/" target="_blank">https://www.linkedin.com/in/alisoncarlos/</a><br />
			Instagram: <a href="https://www.instagram.com/draftsourcevirtual/" target="_blank">https://www.instagram.com/draftsourcevirtual/</a><br />
			Website: <a href="https://draftsourcevirtual.com/" target="_blank">https://draftsourcevirtual.com/</a><br />
			WhatsApp: +639178175792<br />
			<br />
			<span style="color: red;">DRAFTSOURCE DOES NOT OWN THESE DOCUMENTS. ADDITIONALLY, THEY ARE NOT ENDORSED BY DRAFTSOURCE IN ANY WAY. THESE DOCUMENTS ARE INCLUDED TO SHOW OUR TEAM’S QUALITY OF WORK AND OUTPUT.</span>
		`;
		const attachments = [
			{
				filename: 'Pricing.pdf',
				path: './public/request_sample/Pricing.pdf',
			},
			{
				filename: 'Project 1.pdf',
				path: './public/request_sample/Project 1.pdf',
			},
			{
				filename: 'Project 2.pdf',
				path: './public/request_sample/Project 2.pdf',
			},
			{
				filename: 'Project 3.pdf',
				path: './public/request_sample/Project 3.pdf',
			},
			{
				filename: 'Project 4.pdf',
				path: './public/request_sample/Project 4.pdf',
			},
			{
				filename: 'Project 5.pdf',
				path: './public/request_sample/Project 5.pdf',
			},
		];
		try {
			await sendEmail(
				`Draftsource Virtual <${process.env.MAILER_USER}>`,
				businessEmail,
				'Cabinet Vision Sample Projects and Pricing',
				compose,
				attachments
			);
		} catch (error) {
			console.error('error:', error);
			return res.status(error.responseCode).json({ msg: error.response });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
