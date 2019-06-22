const mongoose = require('../models/ExamModel');
const schema = mongoose.model('ExamModel');

const ExamController = function () {
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            const exam = new schema ({
                examName:data.examName,
                examDate: data.examDate,
                examDuration: data.examDuration,
                courseID:data.courseID
            });
            exam.save().then(() => {
                resolve({status:200, message: "New Exam Added successfully"});
            }).catch((err) =>{
                reject({status:500, message:"An error occurred" +err});
            })
        })
    };

    this.getAll = () => {
        return new Promise(((resolve, reject) => {
            schema.find().exec().then((data) => {
                resolve({status:200, data: data});
            }).catch(err => {
                reject({status:500, message: "An error occurred" +err});
            })
        }))
    };

    this.getOne = (ExamID) =>{
        return new Promise((resolve, reject) => {
            schema.find({_id:ExamID }.exec().then((data) => {
                    resolve({status:200, data:data});
                }).catch(err => {
                    reject({status:500, message: "An error occurred" +err});
                })
            )
        })
    };
    this.updateAssignment = function(id,data){
        return new Promise(((resolve, reject) => {
            schema.update({_id:id}, data).exec().then((data) => {
                resolve({status:200, message:"Update Assignment"});
            }).catch(err => {
                reject({status:500, message:"An error occurred " + err})
            })
        }))
    }

    this.delete = (id) => {
        return new Promise(((resolve, reject) => {
            schema.remove({_id:id}).then(() => {
                resolve({status:200, message:"Exam Removed successfully"});
            }).catch(err => {
                reject({status:500, message:"An error occurred " + err});
            })
        }))
    }
};

module.exports = new ExamController();