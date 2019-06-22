// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const StudentEnrollmentSchema = new Schema({
//     studentID: {
//         type: String,
//         require: true
//     },
//
//     courses: [{ type: Schema.Types.ObjectId, ref: 'CourseModel' }],
//     user: [{type: Schema.Types.ObjectId, ref: 'UserModel'}]
//
// });
//
//
// mongoose.model('StudentEnrollment', StudentEnrollmentSchema);
//
//
// module.exports = mongoose;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//StudentModel Schema
const StudentSchema = Schema({

    user:{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'CourseModel'
    }]
});

mongoose.model('LecturerModel', StudentSchema);

module.exports = mongoose;