const express = require('express');
const router      = express.Router();
const StudentCoursesController  = require('../controller/StudentCoursesController');

router.get('/', (req, res) => {
    StudentCoursesController.getAll().then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});


module.exports = router;