const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseModel = new Schema({
    name: {
        type: String,
        require: true
    },
    courseCode: {
        type: String
    },
    lectureInCharge: {
        type: String
    },
    subjects: [

        {
            type: Schema.Types.ObjectId,
            ref: 'SubjectTable'
        }
    ]
});


const subjectModel = new Schema({
    name: {
        type: String,
        require: true,
    },
    subjectCode: {
        type: String
    },
    marks: [

        {
            type: Schema.Types.ObjectId,
            ref: 'MarksTable'
        }
    ]
});

const subjectMarks = new Schema({

    itNumber: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    marks: {
        type: Number
    }
});


mongoose.model("MarksTable", subjectMarks);
mongoose.model("CourseTable", courseModel);
mongoose.model("SubjectTable", subjectModel);

module.exports = mongoose;