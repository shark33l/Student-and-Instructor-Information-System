const mongoose = require('../models/CourseModel');
const schema = mongoose.model('StudentModel');

const StudentController = function () {
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            const student = new schema ({
                user: data.userId
            });
            student.save().then(() => {
                resolve({status:200, message: "Student registered successfully"});
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
    this.updateStudent = function(id,data){
        return new Promise(((resolve, reject) => {
            schema.find({_id:id }.populate().exec().then((availableData) => {

                    //Check for Course List and Push
                    if(data.students){
                        data.courses.push(availableData.courses)
                    }

                    //Update with updated/pushed data
                    schema.update({_id:id}, data).exec().then((data) => {
                        resolve({status:200, message:"Student Updated", data: data});
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
                resolve({status:200, message:"Student Removed successfully"});
            }).catch(err => {
                reject({status:500, message:"An error occurred " + err});
            })
        }))
    }
};

module.exports = new StudentController();