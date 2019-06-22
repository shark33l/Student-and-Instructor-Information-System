const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentEnrollmentSchema = new Schema({
    studentID: {
        type: String,
        require: true
    },

    courses: [{ type: Schema.Types.ObjectId, ref: 'CourseModel' }],
    user: [{type: Schema.Types.ObjectId, ref: 'UserModel'}]

});

// const StudentAssignmentsSchema = new Schema({
//     courseID: {
//         type: String,
//         require: true
//     },
//     courseName: {
//         type: String,
//         require: true
//     },
//
//     assignmentTitle: {
//         type: String,
//         require: true
//     },
//     dueDate: {
//         type:Date,
//         require: true
//     }
//
// });
//
// const StudentExamsSchema = new Schema({
//     courseID: {
//         type: String,
//         require: true
//     },
//     courseName: {
//         type: String,
//         require: true
//     },
//     examTitle: {
//         type: String,
//         require: true
//     },
//     examDate: {
//         type:Date,
//         require: true
//     },
//     examDuration: {
//         type: String,
//         require: true
//     }
//
//
// });
//
// const StudentCoursesSchema = new Schema({
//     courseID: {
//         type: String,
//         require: true
//     },
//     courseName: {
//         type: String,
//         require: true
//     }
// });
//
// const StudentAssignmentUploadSchema = new Schema({
//     studentID: {
//         type: String,
//         require: true
//     },
//     courseID: {
//         type: String,
//         require: true
//     },
//     files: {
//         type: String,
//         require: true
//     }
// });

mongoose.model('StudentEnrollment', StudentEnrollmentSchema);
// mongoose.model('StudentAssignments', StudentAssignmentsSchema);
// mongoose.model('StudentExams', StudentExamsSchema);
// mongoose.model('StudentCourses', StudentCoursesSchema);
// mongoose.model('StudentAssignmentUpload', StudentAssignmentUploadSchema);

// mongoose.connect('mongodb://localhost:27017/comments', (err) => {
//     if (err) {
//         console.log(err);
//         process.exit(-1);
//     }
//     console.log('Connected to the DB');
// });

module.exports = mongoose;