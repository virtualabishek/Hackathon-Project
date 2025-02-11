require("dotenv").config()
const nodeMailer = require("nodemailer");
const mainFunction = async()=>{
   try {
       let transporter = nodeMailer.createTransport({
           host:"smtp.mailgun.org",
           port:587,
           auth:{
               user:`${process.env.MAILGUNUSER}`,
               pass:`${process.env.MAILGUNPASSWORD}`,
           },

       });
       let info = await transporter.sendMail({
           from: 'rojgarsabailai@gmail.com',
           to: "naitikgupta12@gmail.com",
           subject: "Hello",
           text: "Testing some Mailgun awesomness"
       }).then((response)=>{
           console.log("mail sent",response);
       });
   }catch (e) {
       console.log(e)
   }
}

mainFunction();