const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectMarksController');

router.get('/get-subjects', (req, res, next) => {
    subjectController.getSubjects().then((data) => {
        res.status(data.status).send(data.subject);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

router.post('/add-subject', (req, res, next) => {
    const body = req.body;
    subjectController.insertSubject(body).then((data) => {
        res.status(data.status).send(data.message);
    }).catch(err => {
        res.status(err.status).send(err.message);
    })
});

router.get('/get-subject/:subjectCode', (req, res, next) => {
    const params = req.params;
    subjectController.getSubjectsMarks(params.subjectCode).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/add-subject-marks/:subjectCode/:objID', (req, res, next) => {

    subjectController.insertSubjectMarks(req.params.subjectCode,req.params.objID).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

module.exports = router;