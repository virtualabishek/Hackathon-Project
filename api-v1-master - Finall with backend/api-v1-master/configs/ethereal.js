const nodeMailer = require("nodemailer");
const mainEmailFunction = async(otp)=>{
    try {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.etheralUser,
                pass: process.env.etheralPassword
            }
        });
        let info = await transporter.sendMail({
            from: 'rojgarsabailai@nepal.np',
            to: "test-user@gmail.com",
            subject: "Hello",
            text: `your otp is ${otp || 12}`
        }).then((response)=>{
            console.log("mail sent",response);
        });
    }catch (e) {
        console.log(e)
    }
}

module.exports = mainEmailFunction;
