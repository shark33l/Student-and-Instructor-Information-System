const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//Import User Model
const mongoose = require('../models/UserModel');
const User = mongoose.model('UserModel');

//import JWT & Secret code
const jwtSecret = require('./jwtConfig').secret;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            (email, password, done) => {

            //Match User
            User.findOne({ email : email })
                .then((user) => {

                    //Check Email
                    if(!user) {
                        return done(null, false, { message: "Email used is not registered." });
                    }

                    //Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, { message : "Incorrect Password" })
                        }
                    });
                })
                .catch((err) => {
                    console.log('Error : ' + err);
                    done(err);
                });
        })
    );

    //jwt Startegy
    const opts = {
        jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme('JWT'),
        secretOrKey : jwtSecret
    }

    passport.use(
        'jwt',
        new JWTstrategy(opts, (jwt_payload, done) => {
            User.findOne({ email : jwt_payload.id })
                .then((user) => {
                    if(user) {
                        done(null, user);
                    } else {
                        done(null, false, { message: 'Email used is not registered.' });
                    }
                }).catch((err) => {
                    console.log('Error : ' + err);
                    done(err);
            })
        })
    )

    //Serializing
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Deserializing
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}