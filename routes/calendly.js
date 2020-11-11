const express = require('express');
const router = express.Router();

// @route   GET /api/calendly
// @desc    Get calendly api url in env file.
// @access  Public
router.get('/:type', (req, res) => {
	const { type } = req.params;
	switch (type) {
		case 'schedule_demo':
			return res.json({ url: process.env.CALENDLY_URL_SCHEDULE_DEMO });
		case 'talk_recruiter':
			return res.json({ url: process.env.CALENDLY_URL_TALK_RECRUITER });
		case 'book_interview':
			return res.json({ url: process.env.CALENDLY_URL_BOOK_INTERVIEW });
		default:
			return res.status(404).json({ msg: 'No type request.' });
	}
});

module.exports = router;
