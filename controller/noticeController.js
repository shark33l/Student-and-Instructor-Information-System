const mongoose = require('../model/DBSchema');
const NoticeModel = mongoose.model('Notice');

const noticeController = function () {

    this.insert = (data) => {
        return new Promise((resolve, reject) => {
            const notice = new NoticeModel({
                Title:data.Title,
                Type:data.Type,
                Body:data.Body,
                Date: data.Date
            });
            notice.save().then(() => {
                resolve({status: 200, message: "Added new Notice successfully"});
            }).catch((err) => {
                reject({status: 500, message: "Notice could not be added due to " + err})
            })
        })

    };


    this.getNotice = () => {
        return new Promise((resolve, reject) => {
            NoticeModel.find().exec().then((data) => {
                resolve({status: 200, notices: data});
            }).catch((err) => {
                reject({status: 404, message: "Error: " + err});
            })

        })
    };

    /*this.update = (id, data) => {
        return new Promise((resolve, reject) => {
            NoticeModel.update({_id: id}, data).then(() => {
                resolve({status: 200, message: "User updated successfully"})
            }).catch((err) => {
                reject({status: 500, message: "Error: "+ err});
            })
        })
    };



    this.delete = (id) => {
        return new Promise((resolve, reject) => {
            NoticeModel.remove({_id: id}).then(() => {
                resolve({status:200, message: "Deleted user"});
            }).catch(err => {
                reject({status: 500, message: "Could not be deleted due to " + err})
            })
        })
    }*/
};

module.exports = new noticeController();