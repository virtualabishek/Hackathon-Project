const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const jobSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    position:{
        type:String,
        require:true,
    },
    province:{
        type:String,
        require:true,
    },
    district:{
        type:String,
        require:true,
    },
    muncipality:{
        type:String,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    ward:{
        type:String,
        require:true,
    },

});

const jobModel = mongoose.model("Job",jobSchema);

module.exports = jobModel;