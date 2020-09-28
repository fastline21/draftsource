const express = require('express');
const router = express.Router();
const fs = require('fs');

// Models
const Resume = require('./../models/Resume');

// Middleware
const auth = require('./../middleware/auth');

// @route   GET /api/candidate/view-candidates
// @desc    Get approve candidates
// @access  Private
router.get('/view-candidates', async (req, res) => {
    const query = req.query;
    let queryData = {};
    for (const [key, value] of Object.entries(query)) {
        if (key === 'specialty' || key === 'software') {
            if (value.split(',').length > 1) {
                queryData = { ...queryData, [key]: value.split(',') };
            } else {
                queryData = { ...queryData, [key]: value };
            }
        } else if (key === 'search') {
            queryData = {
                ...queryData,
                $or: [
                    { specialty: new RegExp(`^${value}$`, 'i') },
                    { software: new RegExp(`^${value}$`, 'i') },
                ],
            };
        } else if (key === 'page' || key === 'limit') {
            continue;
        } else {
            queryData = { ...queryData, [key]: value };
        }
    }
    const candidates = await Resume.find({ ...queryData, status: 'Approve' });
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

    if (endIndex < candidates.length) {
        results.next = {
            page: page + 1,
            limit,
        };
    }

    results.total = candidates.length;

    results.candidates = candidates.slice(startIndex, endIndex);
    res.json(results);
});

// @route   GET /api/candidate/new-applicants
// @desc    Get pending candidates
// @access  Private
router.get('/new-applicants', async (req, res) => {
    const query = req.query;
    let queryData = {};
    for (const [key, value] of Object.entries(query)) {
        if (key === 'specialty' || key === 'software') {
            if (value.split(',').length > 1) {
                queryData = { ...queryData, [key]: value.split(',') };
            } else {
                queryData = { ...queryData, [key]: value };
            }
        } else if (key === 'search') {
            queryData = {
                ...queryData,
                $or: [
                    { specialty: new RegExp(`^${value}$`, 'i') },
                    { software: new RegExp(`^${value}$`, 'i') },
                ],
            };
        } else if (key === 'page' || key === 'limit') {
            continue;
        } else {
            queryData = { ...queryData, [key]: value };
        }
    }
    const candidates = await Resume.find({ ...queryData, status: 'Pending' });
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

    if (endIndex < candidates.length) {
        results.next = {
            page: page + 1,
            limit,
        };
    }

    results.total = candidates.length;

    results.candidates = candidates.slice(startIndex, endIndex);
    res.json(results);
});

// @route   GET /api/candidate/approved-applicants
// @desc    Get approve candidates
// @access  Private
router.get('/approved-applicants', auth, async (req, res) => {
    const query = req.query;
    let queryData = {};
    for (const [key, value] of Object.entries(query)) {
        if (key === 'specialty' || key === 'software') {
            if (value.split(',').length > 1) {
                queryData = { ...queryData, [key]: value.split(',') };
            } else {
                queryData = { ...queryData, [key]: value };
            }
        } else if (key === 'search') {
            queryData = {
                ...queryData,
                $or: [
                    { specialty: new RegExp(`^${value}$`, 'i') },
                    { software: new RegExp(`^${value}$`, 'i') },
                ],
            };
        } else if (key === 'page' || key === 'limit') {
            continue;
        } else {
            queryData = { ...queryData, [key]: value };
        }
    }
    const candidates = await Resume.find({ ...queryData, status: 'Approve' });
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

    if (endIndex < candidates.length) {
        results.next = {
            page: page + 1,
            limit,
        };
    }

    results.total = candidates.length;

    results.candidates = candidates.slice(startIndex, endIndex);
    res.json(results);
});

// @route   GET /api/candidate/rejected-applicants
// @desc    Get reject candidates
// @access  Private
router.get('/rejected-applicants', auth, async (req, res) => {
    const query = req.query;
    let queryData = {};
    for (const [key, value] of Object.entries(query)) {
        if (key === 'specialty' || key === 'software') {
            if (value.split(',').length > 1) {
                queryData = { ...queryData, [key]: value.split(',') };
            } else {
                queryData = { ...queryData, [key]: value };
            }
        } else if (key === 'search') {
            queryData = {
                ...queryData,
                $or: [
                    { specialty: new RegExp(`^${value}$`, 'i') },
                    { software: new RegExp(`^${value}$`, 'i') },
                ],
            };
        } else if (key === 'page' || key === 'limit') {
            continue;
        } else {
            queryData = { ...queryData, [key]: value };
        }
    }
    const candidates = await Resume.find({ ...queryData, status: 'Reject' });
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

    if (endIndex < candidates.length) {
        results.next = {
            page: page + 1,
            limit,
        };
    }

    results.total = candidates.length;

    results.candidates = candidates.slice(startIndex, endIndex);
    res.json(results);
});

// @route   PUT /api/candidate/approve-resume
// @desc    Approve resume
// @access  Private
router.put('/approve-resume', auth, async (req, res) => {
    const { id, rate, salary } = req.body;
    const resume = await Resume.findByIdAndUpdate(id, {
        status: 'Approve',
        expectedSalary: parseInt(salary),
        rating: rate,
    });
    res.json(resume);
});

// @route   PUT /api/candidate/reject-resume
// @desc    Reject resume
// @access  Private
router.put('/reject-resume', auth, async (req, res) => {
    const { id, rate, salary } = req.body;
    const resume = await Resume.findByIdAndUpdate(id, {
        status: 'Reject',
        expectedSalary: parseInt(salary),
        rating: rate,
    });
    res.json(resume);
});

// @route   DELETE /api/candidate/delete-resume
// @desc    Delete resume
// @access  Private
router.delete('/delete-resume', auth, async (req, res) => {
    const { id } = req.body;
    let resume = await Resume.findById(id);
    const {
        resumeImage,
        internetResult,
        computerSpecs,
        aboutYourself,
        uploadWork,
    } = resume;
    fs.unlink(`${__dirname}/../public/uploads/${resumeImage}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    fs.unlink(`${__dirname}/../public/uploads/${internetResult}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    fs.unlink(`${__dirname}/../public/uploads/${computerSpecs}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    fs.unlink(`${__dirname}/../public/uploads/${aboutYourself}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    uploadWork.images.map((e) => {
        fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });

    uploadWork.documents.map((e) => {
        fs.unlink(`${__dirname}/../public/uploads/${e.file}`, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
    await Resume.findByIdAndDelete(id);
});

// @route   POST /api/candidate/view-resume
// @desc    View resume
// @access  Private
router.post('/view-resume', async (req, res) => {
    const { id } = req.body;
    const resume = await Resume.findById(id);
    res.json(resume);
});

// @route   POST /api/candidate/shortlisted
// @desc    Get shortlist info
// @access  Public
router.post('/shortlisted', async (req, res) => {
    try {
        const shortlisted = await Resume.find()
            .where('_id')
            .in(req.body.shortlisted);
        res.json(shortlisted);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
