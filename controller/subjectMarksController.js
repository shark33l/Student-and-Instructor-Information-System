const mongoose = require('../models/marksModel');
const {ObjectID} = require("mongodb");
const SubjectModel = mongoose.model('SubjectTable');

const subjectMarksController = function () {
    this.insertSubject = (subject) => {
        return new Promise((resolve, reject) => {
            const newSubject = new SubjectModel({
                name: subject.name,
                subjectCode: subject.subjectCode,
                marks: subject.marks
            });

            newSubject.save().then(() => {
                resolve({status: 200, message: "Added Subject Successfully"})
            }).catch(err => {
                reject({status: 500, message: "Error: " + err})
            })
        })
    };

    this.getSubjects = () => {
        return new Promise((resolve, reject) => {
            SubjectModel.find().exec().then((data) => {
                resolve({status: 200, subject: data})
            }).catch(err => {
                reject({status: 500, message: "Error: " + err})
            })
        })
    }

    this.getSubjectsMarks = (code) => {
        return new Promise((resolve, reject) => {
            SubjectModel.findOne({subjectCode: code}).populate('marks').exec().then((data) => {
                resolve({status: 200, message: data})
            }).catch(err => {
                reject({status: 404, message: "Error in finding the course"})
            })
        })
    };

    this.insertSubjectMarks = (code,objID) => {
        return new Promise((resolve, reject) => {

                SubjectModel.update({subjectCode: code},{$push:{"marks":[ObjectID(objID)]}}).then((data) => {
                    resolve({status: 200, message: data});
                }).catch(err => {
                    reject({status: 500, message: "Error:- " + err});
                })

        })
    };


};

module.exports = new subjectMarksController();