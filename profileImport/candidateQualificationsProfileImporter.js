let async = require('async');

let qualificationProcessor = require('../sectioneducation/educationprocessor'); 


let qualificationSectionImporter = function(candidateObj, candidateImportObj) {

  return function(qualificationImportCallback) {
  
    async.each(candidateImportObj.qualification,
    	function(qualificationObj, callback){
    		qualificationSectionImportAsyncIteratee(qualificationObj, candidateObj.candidateid, callback)
    	},
      function(err, result) {
        if (err) {
          qualificationImportCallback(err, null);
        }
        qualificationImportCallback(null, {});
      });
  }
}

let qualificationSectionImportAsyncIteratee = function(qualificationObj, candidateid, callback) {
    console.log("Importing qualification Section..", candidateid, " qualification Obj ", qualificationObj);

    let qualificationImportObj = { qualification: [qualificationObj] };

    qualificationProcessor.addEducation(qualificationImportObj,
      candidateid,
      function(success) { 
        console.log("Qualification import completed ", candidateid);
        callback(null, success); 
      }, function(err) { 
        callback(err, null); 
      });
  } // end of qualificationSectionImportAsyncIteratee


module.exports = {
  qualificationSectionImporter: qualificationSectionImporter
}