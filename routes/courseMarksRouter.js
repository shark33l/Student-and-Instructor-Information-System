const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseMarksController');

router.get('/get-courses', (req, res, next) => {
    courseController.getCourses().then((courses) => {
        res.status(courses.status).send(courses.courses);
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err})
    })
});

router.get('/get-course/:courseCode', (req, res, next) => {
    const params = req.params;
    courseController.getCourseSubjects(params.courseCode).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send(err.message)
    })
});

router.post('/add-course', (req, res, next) => {
    const body = req.body;
    courseController.insertCourse(body).then((data) => {
        res.status(data.status).send(data.message)
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err})
    })
});

module.exports = router;