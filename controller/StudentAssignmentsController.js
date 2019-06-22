const mongoose = require('../models/StudentModel');
const StudentAssignmentsSchema = mongoose.model('StudentAssignments');

const StudentAssignmentsController = function(){

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            StudentAssignmentsSchema.find().exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            StudentAssignmentsSchema.find({courseID:id}).exec().then(data => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }


}

module.exports = new StudentAssignmentsController();