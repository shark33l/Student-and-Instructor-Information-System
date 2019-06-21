const express = require('express');
const router = express.Router();
var assignmentController = require('../controller/AssignmentController');

router.post('/', (req, res) => {
   assignmentController.insert(req.body).then(data => {
       res.status(data.status).send
   })
});



