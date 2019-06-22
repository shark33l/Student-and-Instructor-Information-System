const mongoose = require('../models/StudentModel');
const StudentAssignmentUploadSchema = mongoose.model('StudentAssignmentUpload');

const StudentAssignmentUploadController = function(){

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            const asUpload = new StudentAssignmentUploadSchema({
                studentID: data.studentID,
                courseID: data.courseID,
                files: data.files
            });
            asUpload.save().then(() => {
                resolve({status: 200, message: "Assignment Uploaded"});
            }).catch(err => {
                reject({status: 500, message: "Error:- "+err});
            })
        })

    }


}

module.exports = new StudentAssignmentUploadController();