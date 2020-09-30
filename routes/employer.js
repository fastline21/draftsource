const express = require('express');
const router = express.Router();

// Middlware
const auth = require('./../middleware/auth');

// Models
const Employer = require('./../models/Employer');

// @route   POST /api/employer
// @desc    Create Employer
// @access  Private
router.post('/', auth, async (req, res) => {
    const { firstName, lastName, contactNo, country, company } = req.body;

    if (
        firstName === '' ||
        lastName === '' ||
        contactNo === '' ||
        country === '' ||
        JSON.stringify(country) === JSON.stringify({})
    ) {
        return res
            .status(400)
            .json({ msg: 'Please fill-in the required boxes to Proceed.' });
    } else {
        const employerFields = {
            user: req.user.id,
            firstName,
            lastName,
            contactNo,
            country,
            company,
        };

        try {
            const employer = new Employer(employerFields);
            await employer.save();
            res.json(true);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
});

module.exports = router;
