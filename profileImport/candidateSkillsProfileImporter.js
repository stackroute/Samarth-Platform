let async = require('async');

let skillProcessor = require('../sectionskill/skillprocessor'); 
let skillRelationBuilder = require('../sectionskill/skillrelationbuilder');

let skillSectionImporter = function(candidateObj, candidateImportObj) {

  return function(skillImportCallback) {
  
    async.each(candidateImportObj.skills,
    	function(skillObj, callback){
    		skillSectionImportAsyncIteratee(skillObj, candidateObj.candidateid, callback)
    	},
      function(err, result) {
        if (err) {
          skillImportCallback(err, null);
        }
        skillImportCallback(null, {});
      });
  }
}

let skillSectionImportAsyncIteratee = function(skillObj, candidateid, callback) {
  console.log("Importing Skill Section..", candidateid, " skill Obj ", skillObj);

  let skillImportObj = { skills: [skillObj] };

  skillProcessor.addSkill(skillImportObj,
    candidateid,
    function(skillname, candidateid) {
      console.log("Skills import CRUD completed ", candidateid);
      
      skillRelationBuilder.skillRelationBuilder(
        skillname, candidateid,
        function(err, success) {
          console.log("Skills indexing completed ", candidateid, " with result: ", err, " : ", success);
          if (err) {
            callback(err, null);
          } else {
            callback(null, skillObj);
          }
        }); // end of skillRelationBuilder
    });
}// end of skillSectionImportAsyncIteratee

module.exports = {
  skillSectionImporter: skillSectionImporter
}