const bcrypt = require('bcrypt');
const userModel = require("../../database/models/auth.model");
const otpModel = require("../../database/models/otp.model");
const otpGenerator = require("otp-generator");
const tempAuthModel = require("../../database/models/temporary.auth.model");


const Login = async(request,response)=>{
    const {email,password} = request.body;
    try {
        if(!email || !password){
            return response.status(404).json({success:false,message:"email or password is missing please try again"});
        };
    
        const findUser = await userModel.findOne({email});
        if(findUser.password != password){
            return response.status(404).json({sucess:false,message:"Please enter correct password and try again"});
        }
    
        request.session.userID = findUser._id;
        request.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
                response.status(500).send('Internal Server Error');
            } else {
                if (findUser.role === 'employer') {
                   return response.redirect("/rojgar/postjob");
                } else if (findUser.role === 'employee') {
                  return  response.redirect("/rojgar/findjob");
                } else if (findUser.role === 'admin') {
                   return response.redirect("/rojgar/admin-dashboard");
                }
            }
        });
    } catch (error) {
        response.send(error);
    }
};

const sendOTP = async(request,response)=>{

    try{
        const {email} = request.body;

        //Check if the user is already present

        const findUser = await userModel.findOne({email});
        if(findUser){
            // request.session.formData = null; // until resend otp option is not created
            return response.status(401).json({success:false,message:"Otp is already sent please re-send the otp if you haven't received it"});
        }
        let otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
        let otpObjectForDB = {email,otp};
        const createOTPINDB = await otpModel.create(otpObjectForDB);
        if(!createOTPINDB){
            // request.session.formData = null;
            return response.status(403).json({success:true,message:"OTP not generated"});
        }
    }
    catch(error){
        console.error(error);
    }
};



const afterOtpVerified = async (request,response)=>{
    console.log("inside afterotp is verified");
try{
      let {province,municipality,district,city,address,ward} = request.body;
      //let's first merge the datas into request body and tempAuthModel
      console.log("step 1",request.body);
      await  tempAuthModel.findOne({}).then((tempData) => {
        if (tempData) {
            // Merge data from tempAuthModel and request.body
            // console.log("step2",...tempData.toObject());
            const mergedData = {
                ...tempData.toObject(), // Convert Mongoose document to plain JavaScript object
                province,
                municipality,
                district,
                city,
                address,
                ward
            };
    
            // Create new document in userModel with merged data
         const createUser = userModel.create(mergedData).then((createdData) => {
                    console.log('New document created:', createdData);

            }).catch((error)=>{
                console.log(error);
            }).finally(()=>{
                tempAuthModel.deleteMany({}).catch((err) => {
                    if (err) {
                        console.error('Error deleting documents:', err);
                    } else {
                        console.log('All documents deleted successfully');
                    }
                });
                return response.redirect("/rojgar/login");
            });
        }
    });


}
catch(error){
    // request.session.formData = null;
    return response.status(500).json({success:false,message:"some error occurred please register again"});
}
}



const Register = async (request,response)=>{

    try{
        let {first_name,middle_name,last_name,age,role,email,password} = request.body;
        // console.log(first_name,role,middle_name,last_name,email,password);
        if(!first_name|| !middle_name|| !last_name|| !email || !password || !role || !age){
            // request.session.errorMessage
             return response.status(403).json({success:false,message:"All fields are required"});
        }
        if(!email.includes("@gmail.com")){
            return response.status(402).json({success:false,message:"Please provide correct email address"});
        }
        // now let's check if user already exists
        const checkingIfUserExists = await userModel.findOne({email});

        if(checkingIfUserExists){
            return response.status(400).json({success:false,message:"User already exists please login"});
        }
        //let's store the data into database temporarily
        //  request.session.formData = {
        //     first_name,middle_name,last_name,role,age,email,password
        // };
        const createTempAuth = await tempAuthModel.create({
            firstName:first_name,middleName:middle_name,lastName:last_name,role,age,email,password
        })
        if(!createTempAuth){
            return response.status(402).json({success:false,message:"cannot save the temporary data into database please try again"});
        }

        //now let's send the otp
        await sendOTP(request,response).finally(()=>{
                response.redirect(`/rojgar/otp-verify?email=${email}`); // Redirect to OTP verification page
        }).catch((err)=>{
            
            return response.status(500).json({success:false,message:err});
        })

    }catch(error){
        console.log(error);
    }

};




const verifyOTP = async (request,response)=>{
    try{

        let { email, otp1, otp2, otp3, otp4, otp5, otp6 }= request.body;
        // console.log(otp1,otp2);
        const otpCode = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
        console.log(email);
        if(!email){
            // request.session.formData = null;
            return response.status(401).json({success:false,message:"no email found"});
        }
        if(email){
            const findOTPFROMDATABASE = await otpModel.findOne({email:email});
            if(!findOTPFROMDATABASE){
                return response.status(404).json({success:false,message:"OTP not found please resend the otp"});
            }
            if(findOTPFROMDATABASE.otp !== otpCode){
                return response.status(401).json({success:false,message:"OTP not matched please provide correct otp"});
            }
            return response.redirect('/rojgar/register-2');
        }
    }catch(error){
      console.error(error.message);
    }
};
const ForgotPassword = async(request,response)=>{
    console.log("forgot password page");
};


const logout = async(request,response)=>{
    console.log("inside logout");
try {
    request.session.destroy((err) => {
        if (err) {
            console.error('Error while trying to logout:', err);
            response.status(500).send('Internal Server Error');
        } else {
            response.redirect('/'); // Redirect to the home page or any other desired page
        }
    });
} catch (error) {
    
}
};

module.exports = {Login,Register,verifyOTP,ForgotPassword,afterOtpVerified,logout};