require("dotenv").config();

const express = require("express");
const app = express();
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./database/connection/connectDB");
const auth = require("./routes/authRoutes");
const employerRoute = require("./routes/employer.route");
const employeeRoute = require("./routes/employee.route");
const path = require("path");
const port = process.env.PORT || 5500;
const userModel = require("./database/models/auth.model");
app.set('view engine', 'ejs');

// Serve static files from the public directory

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
connectDB().then(()=>{
    console.log("connected to database");
}).catch((error)=>{
    console.log(error)
});

//creating the session store
const store = new mongoDBStore({
    uri:process.env.MONGO_URI,
    collection:'sessions',
});
if(store){
    console.log("store for session initiated successfully");
    app.use(session({
        secret: process.env.SESSIONKEY,
        resave: false,
        saveUninitialized: false,
        store:store,
    }));
}


app.get('/', async(request, response) => {
try {
    const userData = request.session.userID;
    const findUser = await userModel.findById(userData);
    if(!findUser){
        console.log("no user data found please log in");
    }
    console.log(path.join(__dirname,'views', 'index'));
    response.render(path.join(__dirname,'views', 'index'),{findUser});
} catch (error) {
    response.status(500).json({success:false,message:"server internal error please try to reload the page"});
}
});

//adding routes
app.use("/rojgar",auth);
app.use("/rojgar",employeeRoute);
app.use("/rojgar",employerRoute);






//start the app
app.listen(port,()=>{
    console.log(`connected to port ${port}`);
});