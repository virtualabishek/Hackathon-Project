var postmark = require("postmark");

// Send an email:

const sendEmail = async()=>{
    var client = new postmark.ServerClient("cfa05596-0456-406f-8c69-d9bb03db171b");

    await client.sendEmail({
        "From": "subarnamiyer@gmail.com",
        "To": "naitikgupta12@gmail.com",
        "Subject": "Test",
        "TextBody": "Hello testing email service"
    }).then((response)=>{
        console.log(response);
    }).catch((error)=>{
        console.log(error);
    });
};
sendEmail();