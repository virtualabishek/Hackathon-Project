const jobModel = require("../../database/models/job.model");

const postJob = async(request,response)=>{
    const {position} = request.body;
    const {userId,province,district,muncipality,city,ward} = request.session.formData;
    if(!position){
        return response.status(404).json({success:false,message:"Job position is required"});
    }
    if(!userId || !province || !district || !muncipality || !city || !ward){
        return response.status(404).json({success:false,message:"User data not found please login again"});
    };
    const createJob = await jobModel.create({
        userId,
        position,
        district,
        muncipality,
        city,
        ward,
    });
    if(!createJob){
        return response.status(403).json({success:false,message:"Please try again could not create job posting"});
    }
    return response.status(200),json({success:true,message:"Job Posting created successFully"});
};

const updateJob = async(request,response)=>{};

const jobCompleted = async(request,response)=>{};

const terminateJob = async(request,response)=>{

};

module.exports = {postJob,updateJob,jobCompleted,terminateJob};