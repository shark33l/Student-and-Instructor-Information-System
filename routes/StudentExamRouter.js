const express = require('express');
const router      = express.Router();
const StudentExamsController  = require('../controller/StudentExamsController');

router.get('/', (req, res) => {
    StudentExamsController.getAll().then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});

router.get('/:id', (req, res) => {
    StudentExamsController.getOne(req.params.id).then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});


module.exports = router;