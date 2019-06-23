const mongoose = require('../models/marksModel');
const marksModel = mongoose.model('MarksTable');

const marksController = function () {
    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            const marks = new marksModel({
                itNumber: data.itNumber,
                name: data.name,
                marks: parseInt(data.marks)

            });
            marks.save().then((data) => {
                resolve({status: 200, objID: data._id});
            }).catch((err) => {
                reject({status: 500, message: "Marks could not be added due to " + err})
            })
        })

    };

    this.searchAll = () => {
        return new Promise((resolve, reject) => {
            marksModel.find().exec().then((data) => {
                resolve({status: 200, marks: data});
            }).catch((err) => {
                reject({status: 404, message: "Error: " + err});
            })

        })
    };

    /*this.update = (id, data) => {
        return new Promise((resolve, reject) => {
            marksModel.update({_id: id}, data).then(() => {
                resolve({status: 200, message: "User updated successfully"})
            }).catch((err) => {
                reject({status: 500, message: "Error: "+ err});
            })
        })
    };*/

   /* this.getUser = (id) => {
        return new Promise((resolve, reject) => {
            marksModel.find({_id: id}).exec().then((marks) => {
                resolve({status: 200, marks: marks});
            }).catch(err => {
                reject({status: 404, message: "User not found"})
            })
        })
    };*/

    /*this.delete = (id) => {
        return new Promise((resolve, reject) => {
            marksModel.remove({_id: id}).then(() => {
                resolve({status:200, message: "Deleted user"});
            }).catch(err => {
                reject({status: 500, message: "Could not be deleted due to " + err})
            })
        })
    }*/
};

module.exports = new marksController();