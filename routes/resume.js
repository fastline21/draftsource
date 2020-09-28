const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');
const path = require('path');

// Models
const Resume = require('./../models/Resume');

// Middleware
const auth = require('./../middleware/auth');

router.post('/sample', (req, res) => {
    const { upload } = req.files;

    const generateFileName = (file, fieldname) => {
        const filename = randomstring.generate({
            length: 6,
            charset: 'numeric',
        });
        return `${fieldname}-${filename}-${Date.now()}${path.extname(
            file.name
        )}`;
    };

    let resumeImage = upload;
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
    res.json(resumeImage);
});

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
        facebook,
        workspace,
        internetType,
        hardwareType,
        brandName,
        availability,
        expectedSalary,
        currency,
    } = req.body;
    let { specialty, software, education, workHistory, uploadWork } = req.body;
    let uploadFile = req.files;
    education = JSON.parse(education);
    workHistory = JSON.parse(workHistory);
    uploadWork = JSON.parse(uploadWork);

    specialty = specialty.split(',');
    software = software.split(',');

    const generateFileName = (file, fieldname) => {
        const filename = randomstring.generate({
            length: 6,
            charset: 'numeric',
        });
        console.log(fieldname, 'fieldname');
        console.log(filename, 'filename');
        console.log(file, 'file');
        return `${fieldname}-${filename}-${Date.now()}${path.extname(
            file.name
        )}`;
    };

    let resumeImage = uploadFile.resumeImage;
    console.log(resumeImage, 'resume image');
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

    let internetResult = uploadFile.internetResult;
    const internetResultFile = generateFileName(
        internetResult,
        'internetResult'
    );
    internetResult.mv(
        `${__dirname}/../public/uploads/${internetResultFile}`,
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        }
    );
    internetResult = internetResultFile;

    let computerSpecs = uploadFile.computerSpecs;
    const computerSpecsFile = generateFileName(computerSpecs, 'computerSpecs');
    computerSpecs.mv(
        `${__dirname}/../public/uploads/${computerSpecsFile}`,
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        }
    );
    computerSpecs = computerSpecsFile;

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

    let uploadWorkDocument = '';
    if (uploadWork.documents.length > 1) {
        uploadFile.documents.forEach((element) => {
            const uploadWorkDocumentFile = generateFileName(
                element,
                'uploadWorkDocument'
            );
            element.mv(
                `${__dirname}/../public/uploads/${uploadWorkDocumentFile}`,
                (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                }
            );
            uploadWorkDocument = [
                ...uploadWorkDocument,
                uploadWorkDocumentFile,
            ];
        });
    } else {
        const uploadWorkDocumentFile = generateFileName(
            uploadFile.documents,
            'documents'
        );
        uploadFile.documents.mv(
            `${__dirname}/../public/uploads/${uploadWorkDocumentFile}`,
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
            }
        );
        uploadWorkDocument = uploadWorkDocumentFile;
    }

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
        uploadWork.documents = uploadWork.documents.map((x, i) => {
            return {
                ...x,
                file:
                    uploadWork.documents.length > 1
                        ? uploadWorkDocument[i]
                        : uploadWorkDocument,
            };
        });

        const resumeFields = {
            user: req.user.id,
            firstName,
            lastName,
            email,
            cellphone,
            city,
            country,
            facebook,
            resumeImage,
            workspace,
            internetType,
            hardwareType,
            brandName,
            internetResult,
            computerSpecs,
            availability,
            expectedSalary,
            currency,
            aboutYourself,
            education,
            workHistory,
            specialty,
            software,
            uploadWork,
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
