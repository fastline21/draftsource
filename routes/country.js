const express = require('express');
const router = express.Router();
const ipstack = require('ipstack');
const publicIp = require('public-ip');

router.get('/', async (req, res) => {
	const current_ip = await publicIp.v4();
	ipstack(current_ip, 'b4db4bab529b4c529dd0cf6b95d721ef', (err, response) => {
		const { country_name } = response;
		res.json({ country_name });
	});
});

module.exports = router;
