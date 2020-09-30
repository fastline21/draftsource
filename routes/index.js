const express = require('express');
const router = express.Router();

// Resume API
router.use('/resume', require('./resume'));

// Auth API
router.use('/auth', require('./auth'));

// Candidate API
router.use('/candidate', require('./candidate'));

// Job API
router.use('/job', require('./job'));

// Employer API
router.use('/employer', require('./employer'));

module.exports = router;
