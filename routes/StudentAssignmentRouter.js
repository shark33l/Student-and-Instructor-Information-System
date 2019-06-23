const express = require('express');
const router = express.Router();
const StudentAssignmentsController  = require('../controller/StudentAssignmentsController');

router.get('/', (req, res) => {
    StudentAssignmentsController.getAll().then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});

router.get('/:id', (req, res) => {
    StudentAssignmentsController.getOne(req.params.id).then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});


module.exports = router;