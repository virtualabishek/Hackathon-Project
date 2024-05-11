const userModel = require("../../database/models/auth.model");

const requiredRole = (role) => {
    return async (request, response, next) => {
       try {
        if (request.session && request.session.userID) {
            const user = await userModel.findById(request.session.userID);
            console.log(user);
            if (user) {
                if (user.role === role) {
                    next(); // let's let this user access this route
                }
                else {
                    response.status(403).json({ success: false, message: `You are not authorized to access this page please log in as ${role}` });
                }
            } else {
                response.status(401).json({ success: false, message: "You are not authorized please sign in" });

            }
        }
       } catch (error) {
        response.status(500).json({success:false,message:error});
       }
    };
};
module.exports = requiredRole;