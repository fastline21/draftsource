const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');

// Models
const User = require('./../models/User');
const Admin = require('./../models/Admin');

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
                    res.json(user);
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
                    res.json(user);
                }
            } catch (error) {
                console.error(error.message);
                return res.status(500).send('Server Error');
            }
        }
    } else if (type === 'Admin') {
        const { email, password, password2, firstName, lastName } = req.body;

        if (
            email === '' ||
            password === '' ||
            password2 === '' ||
            firstName === '' ||
            lastName === ''
        ) {
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
