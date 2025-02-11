const express = require("express");
const path = require("path");
const routes = express.Router();
const userModel = require("../database/models/auth.model");


routes.route("/job-listings").get((request,response)=>{
    response.render(path.join(__dirname,'..','views','job_listing'));
});

routes.route("/job-overview").get((request,response)=>{
    response.render(path.join(__dirname,'..','views','job_details'));
});

routes.route("/applied-jobs").get(async(request,response)=>{
    try {
        const userData = request.session.userID;
        const findUser = await userModel.findById(userData);
        if(!findUser){
            return response.status(404).json({success:false,message:"User data not found please try to logout and login again"});
        }
        response.render(path.join(__dirname,'..','views','applied-jobs'),{findUser});
    } catch (error) {
        response.status(500).json({success:false,message:"Could not load this page please try again"});
    }
});

module.exports = routes;