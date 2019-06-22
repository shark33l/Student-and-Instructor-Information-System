const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//ExamsModelSchema
const ExamSchema = new Schema ({
    examName:{
        type:String,
        required:true
    },
    examDate:{
        type:String,
        required:true
    },
    examDuration:{
        type:String,
        required:true
    },
    courseID:{
        type:String,
        required:true
    }
});

mongoose.model( 'ExamModel', ExamSchema);
module.exports = mongoose;