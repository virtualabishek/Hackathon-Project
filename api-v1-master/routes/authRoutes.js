const express = require("express");
const path = require("path");
const routes = express.Router();
const {Login,Register,ForgotPassword,verifyOTP,afterOtpVerified,logout} = require("../controller/auth_controller/loginRegister");
const authenticationCheck = require("../middlewares/auth/authentication.middleware");
const authorizationCheck = require("../middlewares/authorization/authorization.role");
const userModel = require("../database/models/auth.model");

//GET ROUTES


routes.route("/register-1").get((request,response)=>{
    // Adjust the path to point to the register.ejs file inside the views directory
    response.render(path.join(__dirname, '..', 'views', '1sign-up'));
});
routes.route("/register-2").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', '2sign-up'));
});
routes.route("/login").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'login'));
});
routes.route("/forget-password").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'forget-password'));
});
routes.route("/new-password").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'new-password'));
});

routes.route("/otp-verify").get((request,response)=>{

    response.render(path.join(__dirname, '..', 'views', 'otp-verify'),{ email: request.query.email });
});

routes.route("/postjob").get(authenticationCheck,authorizationCheck("employer"),(request,response)=>{
    response.render(path.join(__dirname,'..','views','postjob'));
});

routes.route("/findjob").get(authenticationCheck,authorizationCheck("employee"),(request,response)=>{
    response.render(path.join(__dirname,'..','views','job_listing'));
});

routes.route("/profile").get(authenticationCheck,async (request,response)=>{

    try {
        const userData = request.session.userID;
        const findUser = await userModel.findById(userData);
        if(!findUser){
            return response.status(404).json({success:false,message:"User data not found please try to logout and login again"});
        }
        response.render(path.join(__dirname,'..','views','profile'),{findUser});
    } catch (error) {
        response.status(500).json({success:false,message:"Could not load this page please try again"});
    }
});


routes.route("/job-description").get((request,response)=>{
    try {
        response.render(path.join(__dirname,'..','views','job_details'));
    } catch (error) {
        response.status(500).json({success:false,message:"Something went wrong server error",error});
    }
});


routes.route("/admin-dashboard").get(authenticationCheck,authorizationCheck("admin"),(request,response)=>{
    response.send({sucess:true,message:"checking authorization"});
});





//POST ROUTES
routes.route("/api/v1/login").post(Login);
routes.route("/api/v1/register").post(Register);
routes.route("/api/v1/verify-otp").post(verifyOTP);
routes.route("/api/v1/register-2").post(afterOtpVerified);
routes.route("/api/v1/logout").post(logout);
routes.route("/api/v1/forgetpassword").post(ForgotPassword);

module.exports = routes;