const express     = require('express');
const router      = express.Router();
const StudentAssignmentUploadController  = require('../controller/StudentAssignmentUploadController');

router.post('/', (req, res) => {
    StudentAssignmentUploadController.insert(req.body).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: err.message});
    })
});


module.exports = router;