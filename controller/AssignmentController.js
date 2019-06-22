const mongoose = require('../models/AssignmentModel');
const schema = mongoose.model('AssignmentModel');

const AssignmentController = function () {
    this.insert = function (data) {
        return new Promise((resolve, reject) => {
            const assignment = new schema ({
                Title:data.Title,
                Description: data.Description,
                CourseID: data.CourseID,
                DueDate: data.DueDate,
                File: data.File
            });
            assignment.save().then(() => {
                resolve({status:200, message: "New Assignment Added successfully" +data.Title+ "" +data.Description+ "" +data.CourseID+ "" + data.DueDate+" "+data.File});
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

    this.getOne = (AssignmentID) =>{
        return new Promise((resolve, reject) => {
           schema.find({_id:AssignmentID }.exec().then((data) => {
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
                reject({status:500, message:"An error occured " + err})
            })
        }))
    }

    this.delete = (id) => {
        return new Promise(((resolve, reject) => {
            schema.remove({_id:id}).then(() => {
                resolve({status:200, message:"Assignment Removed successfully"});
            }).catch(err => {
                reject({status:500, message:"An error occured " + err});
            })
        }))
    }
};

module.exports = new AssignmentController();