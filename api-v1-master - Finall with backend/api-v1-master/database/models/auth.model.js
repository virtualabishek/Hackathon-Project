const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    middleName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:String,
        required:true,
        trim:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    municipality:{
        type:String,
        required:true,
        trim:true,
    },
    district:{
        type:String,
        required:true,
        trim:true,
    },
    ward:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },

    role:{
    type:String,
    enum:['Admin','employer','employee'],
    },


});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;