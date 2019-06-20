const express = require('express');
const router = express.Router();
const passport = require('passport');

//Import Controller
const userController = require('../controller/UserController');

router.get('/login', (req, res) => res.send('Login'));
router.get('/register', (req, res) => res.send('Register'));


// Register User
router.post('/register', (req, res) => {

    console.log("Request Body - " + req.body.email)
    //Check if Email is already in Use
    userController.checkUserExisting(req.body.email).then((data) => {
        if(data.data) {

            //User Exists
            res.status(data.status).send({user : data.data});

        } else {

            //New User
            userController.register(req.body).then((data) => {
                res.status(data.status).send({message : data.message, created : true, userId: data.id});
            }).catch((err) => {
                res.status(err.status).send({message : err.message});
            })

        }
    }).catch((err) => {
        res.status(err.status).send({message : err.message});
    })
})

// Login User
router.post('/login', (req, res, next) => {

   passport.authenticate('local', {
       successRedirect : '/dashboard',
       failureRedirect : '/login',
   })(req, res, next);

});

// Logout User
router.get('/logout', (req,res) => {
    req.logout();
})

module.exports = router;