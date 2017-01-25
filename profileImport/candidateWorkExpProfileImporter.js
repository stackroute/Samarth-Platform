let async = require('async');

let workExpProcessor = require('../sectionworkexperiance/workprocessor'); 


let workExpSectionImporter = function(candidateObj, candidateImportObj) {

  return function(workExpImportCallback) {
  
    async.each(candidateImportObj.workexperience,
    	function(workExpObj, callback){
    		workExpSectionImportAsyncIteratee(workExpObj, candidateObj.candidateid, callback)
    	},
      function(err, result) {
        if (err) {
          workExpImportCallback(err, null);
        }
        workExpImportCallback(null, {});
      });
  }
}

let workExpSectionImportAsyncIteratee = function(workExpObj, candidateid, callback) {
    console.log("Importing workExp Section..", candidateid, " workExp Obj ", workExpObj);

    let workExpImportObj = { workexperience: [workExpObj] };

    workExpProcessor.addworkexp(workExpImportObj,
      candidateid,
      function(success) { 
        console.log("workexperience import completed ", candidateid);
        callback(null, success); 
      }, function(err) { 
        callback(err, null); 
      });
  } // end of workExpSectionImportAsyncIteratee


module.exports = {
  workExpSectionImporter: workExpSectionImporter
}