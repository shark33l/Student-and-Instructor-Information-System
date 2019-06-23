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

//NodeMailer
const nodemailer = require('nodemailer');

//Crypto - random generator
const crypto = require('crypto');

//Bcrypt for Password Hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
                res.status(data.status).send({message : data.message, created : true, userId: data.id, email: data.email});
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

// Forgot Password
router.post('/passwordreset', (req, res, next) => {

    console.log(req.body.reason)

    if(req.body.email === ''){
        res.send({available : false, message: 'Email field is empty. Email required.'})
    }
    User.findOne({
        email : req.body.email
    }).then(user => {
        if(user === null){
            res.send({available : false, message: 'Unregistered user email. Please try again'})
        } else {
            const token = crypto.randomBytes(20).toString('hex');
            console.log('144 - ' + token);
            User.updateOne({email: req.body.email}, {
                resetPasswordToken : token,
                resetPasswordExpires : Date.now() + 360000
            }, (err) => {
                console.log(err)
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: false,
                auth: {
                    user: 'hogwartswizardschoolinfo@gmail.com',
                    pass: 'afModule123'
                },
                tls: {
                    rejectUnauthorized : false
                }
                ,
            });
            const mailOptions = {
                from: 'hogwartswizardschoolinfo@gmail.com',
                to: user.email,
                subject: 'Reset your Password',
                text : 'Hi ' + user.firstName +', \n\nYou are receiving this because you (or someone else) have requested for ' + req.body.reason +
                    ' Please use the below link to reset your password. \n\n' +
                    'http://localhost:3000/resetpassword/'+ token +
                    '\n\nThank You,\n\nHogwats School of Witchcraft & Wizardry'

            };

            console.log('Mail being sent to ' + req.body.email);

            transporter.sendMail(mailOptions, function(err, response){
                if(err){
                    console.error('Error : ' + err);
                } else {
                    console.log('Response - ' + response);
                    console.log(nodemailer.getTestMessageUrl(response))
                    res.status(200).send({message : 'Password Reset Mail Sent', available : true})
                }
            })
        }
    })

})

// Reset Password
router.post('/confirmreset', (req, res, next) => {
    User.findOne({
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {$gt : Date.now()}
    }).then((user => {
        if(user === null){
            console.log('Password reset link is invalid or has expired.');
            res.send({message : 'Password reset link is invalid or has expired.'})
        } else {
            const token = jwt.sign({id: user.email}, jwtSecret);
            res.status(200).send({
                email : user.email,
                name : user.firstName + ' ' + user.lastName,
                userLevel: user.userLevel,
                message : 'Password reset link works.',
                token : token
            })
        }
    }))
})

// Update Password
router.post('/updatepassword', (req, res, next) => {
    User.findOne({
        email : req.body.email
    }).then((user => {
        if(user === null){
            console.log('User does not exist');
            res.send({message : 'User does not exist', completed: false})
        } else {
            //Hash Password
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {

                    if(err) throw err;

                    User.updateOne({email: user.email},{
                        password: hash,
                        userLevel: req.body.userLevel,
                        resetPasswordToken: null,
                        resetPasswordExpires: null
                    }, (err) => {
                        console.log(err)
                    }).then(() => {
                        console.log('Password Updated');
                        res.status(200).send({message: 'Password Updated', completed: true})
                    })

                })
            })
        }
    }))
})

module.exports = router;