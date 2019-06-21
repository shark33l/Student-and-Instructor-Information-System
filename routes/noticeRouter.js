const express = require('express');
const router = express.Router();
const noticeController = require('../controller/noticeController');



router.post('/add-notice', (req, res) => {
    const notice = req.body;
    noticeController.insert(notice).then(data => {
        res.status(data.status).send({message: data.message});
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err});
    })
});


router.get('/get-notices', (req, res, next) => {
    noticeController.getNotice().then((data) => {
        res.status(data.status).send({notice: data.notices})
    }).catch(err => {
        res.status(err.status).send({message: "Error: " + err})
    })
});

module.exports = router;
