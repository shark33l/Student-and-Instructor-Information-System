const mongoose = require('../models/StudentModel');
const StudentExamsSchema = mongoose.model('StudentExams');

const StudentExamsController = function(){

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            StudentExamsSchema.find().exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }

    this.getOne = (id) => {
        return new Promise((resolve, reject) => {
            StudentExamsSchema.find({courseID:id}).exec().then(data => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }


}

module.exports = new StudentExamsController();