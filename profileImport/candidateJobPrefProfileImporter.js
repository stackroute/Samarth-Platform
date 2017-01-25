let async = require('async');

let jobPrefProcessor = require('../sectionjobpreferences/jobpreferencesprocessor'); 
let jobPrefRelationBuilder = require('../sectionjobpreferences/jobpreferencesRelationBuilder');

let jobPrefSectionImporter = function(candidateObj, candidateImportObj) {

  return function(jobPrefImportCallback) {
  
    async.each(candidateImportObj.preferences,
    	function(jobPrefObj, callback){
    		jobPrefSectionImportAsyncIteratee(jobPrefObj, candidateObj.candidateid, callback)
    	},
      function(err, result) {
        if (err) {
          jobPrefImportCallback(err, null);
        }
        jobPrefImportCallback(null, {});
      });
  }
}

let jobPrefSectionImportAsyncIteratee = function(jobPrefObj, candidateid, callback) {
  console.log("Importing jobPref Section..", candidateid, " jobPref Obj ", jobPrefObj);

  let jobPrefImportObj = { preferences: [jobPrefObj] };

  jobPrefProcessor.updatePreferences(jobPrefImportObj,
    candidateid,
    function(jobPrefobj) {
      console.log("jobPref import CRUD completed ", candidateid);
      console.log(".......",jobPrefobj);
      jobPrefRelationBuilder.jobpreferencesRelationBuilder(
        jobPrefobj,candidateid,
        function(err, success) {
          console.log("jobPref indexing completed ", candidateid, " with result: ", err, " : ", success);
          if (err) {
            callback(err, null);
          } else {
            callback(null, jobPrefObj);
          }
        }); // end of skillRelationBuilder
    });
}// end of jobPrefSectionImportAsyncIteratee

module.exports = {
  jobPrefSectionImporter: jobPrefSectionImporter
}