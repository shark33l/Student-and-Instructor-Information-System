const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//UserModel Schema
const LecturerSchema = Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'CourseModel'
    }]
});

mongoose.model('LecturerModel', LecturerSchema);

module.exports = mongoose;