const express = require('express');
const router = express.Router();
const marksController = require('../controller/marksController');

//get all the users
router.get('/get-marks', (req, res, next) => {
    marksController.searchAll().then((data) => {
        res.status(data.status).send({marks: data.marks})
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err})
    })
});

router.get('/get-mark/:id', (req, res, next) => {
    const id = req.params.id;
    marksController.getUser(id).then(data => {
        res.status(data.status).send({marks: data.marks});
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err})
    })
});

router.post('/add-marks', (req, res, next) => {
    const marks = req.body;
    marksController.insert(marks).then(data => {
        res.status(data.status).send({objID: data.objID});
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err});
    })
});

/*router.put('/update-marks/:id', (req, res, next) => {
    const id = req.params.id;
    const user = req.body;
    marksController.update(id, user).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err});
    })
});

router.delete('/delete-marks/:id', (req, res, next) => {
    const id = req.params.id;
    marksController.delete(id).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err});
    })
});*/

module.exports = router;
