const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notice = new Schema({

        Title:{
            type:String,
            required:true
        },
        Type:{
            type:String,
            required:true
        },
        Body:{
            type:String,
            required:true
        },
        Date:{
            type:String,
            required:true
        }

});










/*mongoose.connect("mongodb://localhost:27017/Student_Info_Sys_DB", (err) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log("Connected successfully to MongoDB");
});*/

mongoose.model("Notice", Notice);

module.exports = mongoose;