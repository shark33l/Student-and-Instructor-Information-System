const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//AssignmentModelSchema
const AssignmentSchema = new Schema ({
    AssignmentID:{
        type:String
    },
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    CourseID:{
        type:String,
        required:true
    },
    DueDate:{
        type:Date,
        required:true
    },
    File:{
        type:String,
        required:true
    }
});

mongoose.model( 'AssignmentModel', AssignmentSchema);
module.exports = mongoose;