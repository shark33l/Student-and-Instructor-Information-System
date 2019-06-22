const mongoose = require('../models/StudentModel');
const StudentEnrollmentSchema = mongoose.model('StudentEnrollment');

const StudentEnrollmentController = function(){
    this.insert = function (data)  {
        return new Promise((resolve, reject) => {
            const enroll = new StudentEnrollmentSchema({
                studentID: data.studentID,
                courseID: data.courseID
            });
            enroll.save().then(() => {
                resolve({status: 200, message: "Enrolled"});
            }).catch(err => {
                reject({status: 500, message: "Error:- "+err});
            })
        })

    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            StudentEnrollmentSchema.find({studentID:id}).exec().then(data => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }

    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            StudentEnrollmentSchema.remove({studentID:id}).then(() => {
                resolve({status: 200, message: "Un enrolled"});
            }).catch(err => {
                reject({status: 500, message:"Error:- " + err});
            })
        })
    }
}

module.exports = new StudentEnrollmentController();