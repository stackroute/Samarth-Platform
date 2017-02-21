let async = require('async');


let candidateProcessor = require('../candidate/candidateprocessor');
let candidateProfileValidator = require('./candidateProfileValidator');

// let candidateColln = require('../test/singleCandidateImportData.json');
let sillsProfileImport = require('./candidateSkillsProfileImporter');
let qualificationsProfileImport = require('./candidateQualificationsProfileImporter');
let projectsProfileImport = require('./candidateProjectsProfileImporter');
let workExpProfileImport = require('./candidateWorkExpProfileImporter');
let jobPrefProfileImport = require('./candidateJobPrefProfileImporter');

let importedCandidates = [], failedCandidates = [];

let importCandidateProfileColln = function(candidateImportColln, sucessCB, errCB) {
	// console.log("....hihih..........");
	// console.log(candidateColln);
  let promise = new Promise(function(resolve, reject) {

    async.each(candidateImportColln,

      function(candidateImportObj, callback) {
      	// console.log(">>>");
        importCandidateProfile(candidateImportObj).then(function(result) {
          if(result.skip){
            failedCandidates.push(result);
          } else {
            importedCandidates.push(result);
          }
          // sucessCB(success);
          callback(null, result)
        }, function(err) {
          callback(err, null);
        });
      },

      function(err, collnImportResult) {
        if(err) {
      		errCB(err)
      	} else {
          let importResults = {
            failedCandidates :failedCandidates,
            importedCandidates : importedCandidates
          }
          sucessCB(importResults);
      		resolve(importResults);
      	}
      });
  });

  return promise;
}


let importCandidateProfile = function(candidateImportObj) {
  //Register a new Candidate
  //Import Each Sections
  // importCallback(null, {message: "Success"});
  let promise = new Promise(function(resolve, reject) {
  	// console.log('candidateImportObj');
  	// console.log(candidateImportObj);
    // validateCandidateProfile(candidateImportObj);
    validateEachProfileSection(candidateImportObj)
    .then(function(results){
      // console.log(results);
      if(!results.skip){
      candidateProcessor.registerNewCandidate(candidateImportObj)
      .then(function(candidateObj) {
        console.log("Registration of candidate is done: ", candidateObj.candidateid);

        importEachProfileSection(candidateObj, candidateImportObj)
          .then(function(result) {
            resolve(result);
          }, function(err) {
            reject(err);
          });

      }, function(err) {
        reject(err);
      });
    } else {
      resolve(results);
    }
    });
    
    
  });

  return promise;
}

// let validateCandidateProfile = function(candidateImportObj){
//   // candidateProfileValidator.personalInfoValidation(candidateImportObj);
// }

let validateEachProfileSection = function(candidateImportObj){
  let promise = new Promise(function(resolve, reject) {
    async.parallel([
        candidateProfileValidator.personalInfoValidation(candidateImportObj),
        candidateProfileValidator.skillsValidation(candidateImportObj.skills),
        candidateProfileValidator.qualificationsValidation(candidateImportObj.qualifications),
        candidateProfileValidator.projectsValidation(candidateImportObj.projects),
        candidateProfileValidator.workExperiencesValidation(candidateImportObj.workexperiences)
      ],
      function(err, result) {
        let skip = false;
        if(result[0].personalInfoResults.length >0 || result[1].skillsResults.length > 0 
          || result[2].qualificationsResults.length >0 || result[3].projectsResults.length > 0
          || result[4].workExperiencesResults.length >0 ){
          skip = true;
        }
        
        let validationResults = {
          candidateid : candidateImportObj.mobile,
          result : result,
          skip : skip
        }
        // console.log(result[4].workExperiencesResults);
        resolve(validationResults);
      });
  });

  return promise;

}



let importEachProfileSection = function(candidateObj, candidateImportObj) {
  let promise = new Promise(function(resolve, reject) {
    async.parallel([
        sillsProfileImport.skillSectionImporter(candidateObj, candidateImportObj),
        qualificationsProfileImport.qualificationSectionImporter(candidateObj, candidateImportObj),
        projectsProfileImport.projectSectionImporter(candidateObj, candidateImportObj),
        workExpProfileImport.workExpSectionImporter(candidateObj, candidateImportObj)
        // jobPrefProfileImport.jobPrefSectionImporter(candidateObj, candidateImportObj)
      ],
      function(err, result) {
        resolve(candidateObj);
      });
  });

  return promise;
}

//importCandidateProfileColln(candidateColln);

module.exports = {
  importCandidateProfile: importCandidateProfile,
  importCandidateProfileColln: importCandidateProfileColln
}
