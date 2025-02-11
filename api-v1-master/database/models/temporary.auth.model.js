const mongoose = require("mongoose");
const tempAuthSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true
    }, middleName: {
        type:String,
        
    }, lastName: {
        type:String,
        required:true
    }, role: {
        type:String,
        enum:['Admin','employer','employee'],
    }, age: {
        type:String,
        required:true
    }, email: {
        type:String,
        required:true
    }, password: {
        type:String,
        required:true
    },
});

const tempAuthModel = mongoose.model('TempAuth',tempAuthSchema);
module.exports = tempAuthModel;