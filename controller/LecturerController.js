const mongoose = require('../models/CourseModel');
const schema = mongoose.model('LecturerModel');

const LecturerController = function () {
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            const lecturer = new schema ({
                user: data.userId
            });
            lecturer.save().then(() => {
                resolve({status:200, message: "New Lecturer added successfully"});
            }).catch((err) =>{
                reject({status:500, message:"An error occurred" +err});
            })
        })
    };

    this.getAll = () => {
        return new Promise(((resolve, reject) => {
            schema.find().populate().exec().then((data) => {
                resolve({status:200, data: data});
            }).catch(err => {
                reject({status:500, message: "An error occurred" +err});
            })
        }))
    };

    this.getOne = (courseId) =>{
        return new Promise((resolve, reject) => {
            schema.find({_id:courseId }.populate().exec().then((data) => {
                    resolve({status:200, data:data});
                }).catch(err => {
                    reject({status:500, message: "An error occurred" +err});
                })
            )
        })
    };
    this.updateLecturer = function(id,data){
        return new Promise(((resolve, reject) => {
            schema.find({_id:id }.populate().exec().then((availableData) => {

                    //Check for Course List and Push
                    if(data.students){
                        data.courses.push(availableData.courses)
                    }

                    //Update with updated/pushed data
                    schema.update({_id:id}, data).exec().then((data) => {
                        resolve({status:200, message:"Lecturer Updated", data: data});
                    }).catch(err => {
                        reject({status:500, message:"An error occurred " + err})
                    })

                    //Resolve
                    resolve({status:200, data:data});
                }).catch(err => {
                    reject({status:500, message: "An error occurred" +err});
                })
            )

        }))
    }

    this.delete = (id) => {
        return new Promise(((resolve, reject) => {
            schema.remove({_id:id}).then(() => {
                resolve({status:200, message:"Lecturer Removed successfully"});
            }).catch(err => {
                reject({status:500, message:"An error occurred " + err});
            })
        }))
    }
};

module.exports = new CourseController();