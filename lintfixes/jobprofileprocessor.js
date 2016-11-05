let jobProfile = require('./jobprofileschema');
/* get job details by ID*/
function getJobByID(jobID, sucessCB, errorCB) {
    jobProfile.find({ jobID: jobID }, function(error, result) {
        if (error) {
            // console.log(error);
            errorCB(error);
        } else {
            // console.log("Find the job with jobID");
            sucessCB(result);
        }
    });
}

function getJobs(sucessCB, errorCB) {
    jobProfile.find(function(error, result) {
        if (error) {
            // console.log(error);
            errorCB(error);
        } else {
            // console.log("Find the job with jobID");
            sucessCB(result);
        }
    });
}
/* post a job into mongodb collection jobProfiles*/
function postJob(job, sucessCB, errorCB) {
    var job = new jobProfile(job);

    job.save(function(err) {
        if (err) {
            // console.log("Error occured on save" + err);
            errorCB(err);
        } else {
            // console.log("Job Posted successfully");
            sucessCB('successfully inserted data');
        }
    });
}

function getJobDetails(id, employerID, sucessCB, errorCB) {
    jobProfile.find({ jobID: id, 'employer.employerID': employerID }, function(error, result) {
        if (error) {
            // console.log(error);
            errorCB(error);
        } else {
            // console.log("Find the job with jobID");
            // var length = result.length;
            sucessCB(result);
        }
    });
}

function updateJob(jobData, sucessCB, errorCB) {
    jobProfile.update({ _id: jobData._id }, { $set: jobData }, function(err, result) {
        if (err) {
            // console.log("Error occured on save" + err);
            errorCB(err);
        } else {
            // console.log("Job Posted successfully");
            sucessCB('OK');
        }
    });
}
/* exports the functionalities in jobprofileprocessor*/
module.exports = {
    getJobByID: getJobByID,
    postJob: postJob,
    updateJob: updateJob,
    getJobDetails: getJobDetails,
    getJobs: getJobs
};
