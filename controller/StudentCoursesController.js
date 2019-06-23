const mongoose = require('../models/StudentModel');
const StudentCoursesSchema = mongoose.model('StudentCourses');

const StudentCoursesController = function(){

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            StudentCoursesSchema.find().exec().then((data) => {
                resolve({status: 200, data: data});
            }).catch(err => {
                reject({status: 500, message: "Error:- " + err});
            })
        })
    }


}

module.exports = new StudentCoursesController();