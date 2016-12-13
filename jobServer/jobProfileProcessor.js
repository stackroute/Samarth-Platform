var jobProfile = require('./jobProfileSchema');

function addJob(job,successFn, errorFn) {
    //mapping to schema values
    let result=0;
    console.log(job.desc.title);
    jobProfile.find({jobprovider :job.jpCode}).count(function(err,count){
        if(count==0||count>0){
                result=count;
                console.log("result "+result);
                jobCode=(job.jpCode+'-'+(result+1));
    var jobValues = new jobProfile({
                jobcode : jobCode,
                jobprovider : job.jpCode,
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

}else{
    errorFn("Some error occurred");
}
})

}

function getJobs(successFn, errorFn) {
    jobProfile.find(function(error, result) {
        if (error){
            errorFn(error);
        }
         else {
            successFn(result);
        }
    });
}


function getJobDetails(jpCode,jobtitle, successFn, errorFn) {
    jobProfile.find({jobprovider : jpCode, title :jobtitle},function(error, result) {
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
    getJobDetails: getJobDetails
};
