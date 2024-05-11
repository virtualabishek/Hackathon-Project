const mongoose= require("mongoose");

async function connect(){
    const con = await mongoose.connect(process.env.MONGO_URI).then((result)=>console.log("\ninitiating database connection"));

    return con;
};

module.exports = connect;