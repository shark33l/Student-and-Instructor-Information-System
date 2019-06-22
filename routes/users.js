const express = require('express');
const router = express.Router();
const passport = require('passport');

//Import Controller
const userController = require('../controller/UserController');

//Import User Model
const mongoose = require('../models/UserModel');
const User = mongoose.model('UserModel');

//Import JWT
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwtConfig').secret;

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

   passport.authenticate('local', {failureFlash: true},(err, user, info) => {
       console.log("check")
     if(err) {
         console.log(err);
         res.send({message : err.message})
         console.log("check2")
     } if (info){
         console.log(info.message);
         res.status(403).send({ message : info.message});
       } else {
         req.logIn(user, err => {
             console.log(user);
             User.findOne({ email : user.email })
         .then( user => {
             const token = jwt.sign({id: user.email}, jwtSecret);
             res.status(200).send({
                 auth: true,
                 token: token,
                 email: user.email,
                 firstName: user.firstName,
                 lastName: user.lastName,
                 userLevel: user.userLevel,
                 message: 'User found & logged in'
             });
         }).catch((err) => {
             res.status(err.status).send({ message : "Error : " + err })
             });
         });
       }
   })(req, res, next);

});

// Find User
router.get('/finduser', (req, res, next) => {

    passport.authenticate('jwt', { session : false }, (err, user, info) => {

        if(err){
            console.log(err);
            res.send({ message : err.message })
        }

        if( info !== undefined){

            console.log(info.message);
            res.send({ message : info.message })

        } else {

            console.log('User found in DB');
            res.status(200).send({

                auth : true,
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                userLevel : user.userLevel

            })

        }

    })(req, res, next);

})

// Logout User
router.get('/logout', (req,res) => {
    req.logout();
})

module.exports = router;