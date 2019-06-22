const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//UserModel Schema
const CourseSchema = Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    lecturer:{
        type: Schema.Types.ObjectId,
        ref: 'LecturerModel'
    },
    timePeriod: {
        type: String,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'StudentEnrollment'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'AssignmentModel'
    }],
    exams: [{
        type: Schema.Types.ObjectId,
        ref: 'ExamModel'
    }]
});

mongoose.model('CourseModel', CourseSchema);

module.exports = mongoose;