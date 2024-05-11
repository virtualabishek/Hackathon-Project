
const requireAuthentication = (request,response,next)=>{
    if (request.session.userID){
        console.log("inside authentication check");
        next();
    }
    else{
      response.status(401).json({success:false,message:"User is not logged in please go to sign in page"});
    }
};

module.exports = requireAuthentication;