const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Import User Model
const User = require('../models/UserModel');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

            //Match User
            User.findOne({ email : email })
                .then((user) => {

                    //Check Email
                    if(!user) {
                        return done(null, false, { message: 'Email used is not registered.' });
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
                .catch((err) => console.log('Error : ' + err));
        })
    );

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