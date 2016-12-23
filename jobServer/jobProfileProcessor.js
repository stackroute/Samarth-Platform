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
                profession : job.desc.profession,
			    role : job.desc.role,
			    duties : job.desc.duties,
			    location : job.desc.location,
			    experience : job.desc.experience,
			    allowance : job.criteria.allowance,
			    language :  {
                                name:job.desc.name,
                },
			    closedate : job.desc.closedate,
                skills : job.desc.skills,
			    salary : job.criteria.salary,
			    openings : job.desc.openings,
			    qualifications: job.criteria.qualifications
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



function getJobsbyJobId(jobcode,successFn, errorFn) {
    // console.log(jobcode+" in processor");
   jobProfile.find({jobcode:jobcode},function(error, result) {
       if (error){
           errorFn(error);
       }
        else {

           successFn(result);
       }
   });
}
             
function updateJob(jobData, sucessCB, errorCB) {
    console.log('in processor');
    console.log(jobData);
    jobProfile.update({
        jobcode: jobData.jobcode
    }, {
        $set: {
                title : jobData.desc.title,
                profession : jobData.desc.profession,
                role : jobData.desc.role,
                duties : jobData.desc.duties,
                location : jobData.desc.location,
                experience : jobData.desc.experience,
                allowance : jobData.desc.allowance,
                // language :  {
                //                 name:jobData.desc.name,
                // },
                // closedate : jobData.desc.closedate,
                skills : jobData.desc.skills,
                salary : jobData.criteria.salary,
                // openings : jobData.desc.openings,
                qualifications: jobData.criteria.qualifications
        }
    }, function(err, result) {
        if (err) {
            errorCB(err);
        } else {
            sucessCB('OK');
        }
    });
}


module.exports = {
    addJob: addJob,  
    getJobs: getJobs,
    getJobDetails: getJobDetails,
    getJobsbyJobId: getJobsbyJobId,
    updateJob:updateJob
};
