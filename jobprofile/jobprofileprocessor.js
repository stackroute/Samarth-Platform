let jobProfile = require('./jobprofileschema');
/* get job details by ID*/
function getJobByID(jobID, sucessCB, errorCB) {
    jobProfile.find({ jobID: jobID }, function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}

function getJobs(sucessCB, errorCB) {
    jobProfile.find(function(error, result) {
        if (error){
            errorCB(error);
        }
         else {
            sucessCB(result);
        }
    });
}
/* post a job into mongodb collection jobProfiles*/
function postJob(job, sucessCB, errorCB) {
    var job = new jobProfile(job);

    job.save(function(err) {
        if (err) {
            errorCB(err);
        } else {
            sucessCB('successfully inserted data');
        }
    });
}

function getJobDetails(id, employerID, sucessCB, errorCB) {
    jobProfile.find({ jobID: id, 'employer.employerID': employerID }, function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}

function updateJob(jobData, sucessCB, errorCB) {
    jobProfile.update({ _id: jobData._id }, { $set: jobData }, function(err, result) {
        if (err) {
            errorCB(err);
        } else {
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
