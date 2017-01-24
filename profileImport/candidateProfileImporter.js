let async = require('async');

let neo4jConnection = require("../connections/neo4jconnection");
let mongoose = require('mongoose');
let db = neo4jConnection.getConnection();
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

let candidateProcessor = require('../candidate/candidateprocessor');

let candidateColln = require('../test/singleCandidateImportData.json');
let sillsProfileImport = require('./candidateSkillsProfileImporter');
let qualificationsProfileImport = require('./candidateQualificationsProfileImporter');
let projectsProfileImport = require('./candidateProjectsProfileImporter');
let workExpProfileImport = require('./candidateWorkExpProfileImporter');
let jobPrefProfileImport = require('./candidateJobPrefProfileImporter');

let importCandidateProfileColln = function(candidateImportColln) {
	console.log("....hihih..........");
	// console.log(candidateColln);
  let promise = new Promise(function(resolve, reject) {

    async.each(candidateImportColln,

      function(candidateImportObj, callback) {
      	console.log(">>>");
        importCandidateProfile(candidateImportObj).then(function(success) {
          callback(null, sucess)
        }, function(err) {
          callback(err, null);
        });
      },

      function(err, collnImportResult) {
      	if(err) {
      		reject(err)
      	} else {
      		resolve(collnImportResult);
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
  	console.log('candidateImportObj');
  	// console.log(candidateImportObj);
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

importCandidateProfileColln(candidateColln);

module.exports = {
  importCandidateProfile: importCandidateProfile,
  importCandidateProfileColln: importCandidateProfileColln
}
