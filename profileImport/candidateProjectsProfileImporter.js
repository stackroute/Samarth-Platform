let async = require('async');

let projectProcessor = require('../sectionproject/projectprocessor'); 
let projectsRelationBuilder = require('../sectionproject/projectRelationBuilder');

let projectSectionImporter = function(candidateObj, candidateImportObj) {

  return function(projectImportCallback) {
  
    async.each(candidateImportObj.projects,
    	function(projectObj, callback){
    		projectSectionImportAsyncIteratee(projectObj, candidateObj.candidateid, callback)
    	},
      function(err, result) {
        if (err) {
          projectImportCallback(err, null);
        }
        projectImportCallback(null, {});
      });
  }
}

let projectSectionImportAsyncIteratee = function(projectObj, candidateid, callback) {
  console.log("Importing project Section..", candidateid, " project Obj ", projectObj);

  let projectImportObj = { projects: [projectObj] };

  projectProcessor.addProject(projectImportObj,
    candidateid,
    function(projectobj, candidateid) {
      console.log("Projects import CRUD completed ", candidateid);
      
      projectsRelationBuilder.projectRelationBuilder(
        candidateid, projectobj.projects[0].name, projectobj.projects[0].durationInMonths, projectobj.projects[0].location, projectobj.projects[0].skills, projectobj.projects[0].client, projectobj.projects[0].role,
        function(err, success) {
          console.log("Projects indexing completed ", candidateid, " with result: ", err, " : ", success);
          if (err) {
            callback(err, null);
          } else {
            callback(null, projectObj);
          }
        }); // end of ProjectRelationBuilder
    });
}// end of projectSectionImportAsyncIteratee

module.exports = {
  projectSectionImporter: projectSectionImporter
}