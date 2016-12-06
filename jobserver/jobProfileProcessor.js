var jobProfile = require('./jobProfileSchema');

function addJob(job, successFn, errorFn) {
    //mapping to schema values
    var jobValues = new jobProfile({
    			title : job.desc.title,
			    role : job.desc.role,
			    duties : job.desc.duties,
			    location : job.desc.location,
			    experience : job.desc.experience,
			    allowance : job.criteria.externalPerks,
			    language :  {
                                name:job.desc.name,
                },
			    closedate : job.desc.closeDate,
			    skills : { 
                            name:job.desc.skills[0].name,
                            expertise:job.desc.skills[0].expertise,
                            priority:job.desc.skills[0].expertise,
                }, 
			    salary : job.criteria.renumeration,
			    openings : job.desc.openingsNo,
			    qualifications: {
                            name : job.criteria.qualifications[0].name, 
                            score : job.criteria.qualifications[0].score,
                            priority : job.criteria.qualifications[0].priority,
                        }
    });
    
    jobValues.save(function(err) {
        if (err) {
            errorFn(err);
        } else {
            successFn('successfully inserted data');
        }
    });
}

function getJobs(successFn, errorCN) {
    jobProfile.find(function(error, result) {
        if (error){
            errorFn(error);
        }
         else {
            successFn(result);
        }
    });
}


module.exports = {
    addJob: addJob,  
    getJobs: getJobs,
};
