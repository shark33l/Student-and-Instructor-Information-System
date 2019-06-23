const mongoose = require('../models/UserModel');
const schema = mongoose.model('UserModel');

//Bcrypt for Password Hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = function(){

    //Create new User (Register)
    this.register = function(data) {
        return new Promise ((resolve, reject) => {
            const user = schema({
                firstName : data.firstName,
                lastName : data.lastName,
                email : data.email,
                userLevel : data.userLevel,
                password : data.password,
                resetPasswordToken: null,
                resetPasswordExpires: null
            });
            console.log(data);

            //Hash Password
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    console.log(user.password + " " + hash)
                    if(err) throw err;

                    //Set hashed Password
                    user.password = hash;

                    //Save User
                    console.log(user);
                    user.save().then(() => {
                        resolve({status : 200, message : "New User Registered : " + data.firstName + " " + data.lastName, id : user._id, email : user.email});
                    }).catch( (err) => {
                        reject({ status : 500, message : "Error : " + err});
                    })

                })
            })
        })
    }

    //Find User by Email
    this.checkUserExisting = function(email) {
        return new Promise ((resolve, reject) => {
            schema.findOne({ email : email }).exec().then((data) => {
                if(data){
                    resolve({status : 200, data : data});
                } else {
                    resolve({status : 200});
                }
            }).catch((err) => {
                reject({status : 500, message : "Error : " + err})
            })
        })
    }

}

module.exports = new UserController();