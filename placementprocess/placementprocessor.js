let jobProfile = require('../jobServer/jobProfileSchema');

function applyjob(jobdata, sucessCB, errorCB)
{

  console.log('in processor');
  console.log(jobdata)
  jobProfile.findOneAndUpdate({jobcode: jobdata.jobcode},
  {$push: {"placements": {candidateid: jobdata.candidateid,status:"Applied",appliedBy:null,appliedOn:null,offeredOn:null,offeredBy:null,joinedOn:null}}},
  {safe:true,upsert:true,new:true},
    function(err, result) {
      if (err) {
          errorCB(err);
      }else{
      sucessCB(result);
          }
  });
}

function offerjob(jobdata, sucessCB, errorCB)
{

  console.log('in processor');
  console.log(jobdata);
  jobProfile.update({jobcode: jobdata.jobcode,"placements.candidateid":jobdata.candidateid},{$set: {"placements.$.status":"Offered"}},
    function(err, result) {
      if (err) {
          errorCB(err);
      }else{
      sucessCB(result);
          }
  });
}

function rejectjob(jobdata, sucessCB, errorCB)
{

  console.log('in processor');
  console.log(jobdata);
  jobProfile.update({jobcode: jobdata.jobcode,"placements.candidateid":jobdata.candidateid},{$set: {"placements.$.status":"Rejected"}},
    function(err, result) {
      if (err) {
          errorCB(err);
      }else{
      sucessCB(result);
          }
  });
}

module.exports = {
    applyjob: applyjob,
     offerjob:offerjob,
     rejectjob:rejectjob
};
