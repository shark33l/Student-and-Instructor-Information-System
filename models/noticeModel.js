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

mongoose.model("Notice", Notice);

module.exports = mongoose;