const mongoose = require("mongoose");
const sendOtp = require("../../configs/mailGunServices");
const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        trim:true,
    },
    otp: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:60*5, // this document will be deleted after 2 min
    }

});

//the otp will only be sent if it is saved in the database we will ensure this using pre-save hook

otpSchema.pre("save",async function(next){
    console.log("new otp saved to the database");
    if(this.isNew){
       await sendOtp(this.email,this.otp);
    }
    next();
});

const otpModel = mongoose.model("OTP",otpSchema);

module.exports = otpModel;