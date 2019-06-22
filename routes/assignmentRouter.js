const express = require('express');
const router = express.Router();
var assignmentController = require('../controller/AssignmentController');

router.post('/', (req, res) => {
    assignmentController.insert(req.body).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.put('/:id', (req, res) => {
    assignmentController.updateAssignment(req.params.id, req.body).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

router.get('/', (req, res) => {
    assignmentController.getAll().then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});

router.get('/:id', (req, res) => {
    assignmentController.getOne(req.params.id).then(data => {
        res.status(data.status).send({data: data.data});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    });
});

router.delete('/:id', (req, res) => {
    assignmentController.delete(req.params.id).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});

module.exports = router;
