const mongoose = require("mongoose");
const jobCompletedSchema = new mongoose.Schema({
        jobId:{
            type: Schema.Types.ObjectId,
            ref: 'Job',
        },  //this already contains the user data and the job data so we can proceed accordingly

        completionDate: {
            type: Date,
            default: Date.now // This will automatically set the field to the current date/time when a document is created
        },
});

const jobCompletedModel = mongoose.model('Completed',jobCompletedSchema);

module.exports = jobCompletedModel;