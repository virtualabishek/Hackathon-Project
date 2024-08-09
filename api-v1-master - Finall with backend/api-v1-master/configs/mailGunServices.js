require("dotenv").config();
const MAILGUN = require("mailgun.js");
const FORMDATA = require("form-data");

const API_KEY = process.env.MAILAPIKEY;
const DOMAIN = process.env.MAILDOMAIN;

const sendEmail = async (to,otp)=>{
    try {
        let from = "rojgarsabailai@gmail.com"
        const mailGun = new MAILGUN(FORMDATA);
        const client = mailGun.client({username:"api",key:API_KEY});
        
        const messageData = {
            from:"Rojgar Sabailai <nepal@rojgar-sabailai.tech>",
            to:`${ to || 'naitikrauniyar@outlook.com'}`,
            subject:"Please verify your account",
            text:`your otp is ${otp || 'your otp is 12' }`
        };

        client.messages.create(DOMAIN,messageData).then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.error(error);
        });
    }catch(error){
        console.log(error);
    }
}


module.exports = sendEmail;