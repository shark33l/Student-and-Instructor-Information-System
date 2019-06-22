const mongoose = require('../models/CourseModel');
const schema = mongoose.model('CourseModel');

const CourseController = function () {
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            const course = new schema ({
                courseName:data.courseName,
                courseDescription: data.courseDescription,
                lecturer: data.lecturerId,
                timePeriod:data.timePeriod
            });
            course.save().then(() => {
                resolve({status:200, message: "New Course added successfully"});
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
    this.updateCourse = function(id,data){
        return new Promise(((resolve, reject) => {
            schema.find({_id:id }.populate().exec().then((availableData) => {

                    //Check for Student List and Push
                    if(data.students){
                        data.students.push(availableData.students)
                    }

                    //Check for Assignment List and Push
                    if(data.assignments){
                        data.students.push(availableData.assignments)
                    }

                    //Check for Exam List and push
                    if(data.exams){
                        data.students.push(availableData.exams)
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
                resolve({status:200, message:"Course Removed successfully"});
            }).catch(err => {
                reject({status:500, message:"An error occurred " + err});
            })
        }))
    }
};

module.exports = new CourseController();