let profile = require('./profileschema');

let async = require('async');
let skillMissingFinder = require('.././questionbox/skillMissingFinder');
let educationMissingFinder = require('.././questionbox/educationMissingFinder');
let personalInfoMissingFinder = require('.././questionbox/personalInfoMissingFinder');
let projectMissingFinder = require('.././questionbox/projectMissingFinder');
let workMissingFinder = require('.././questionbox/workExpMissingFinder');
let skillprocessor = require('.././sectionskill/skillprocessor');
let educationProcessor = require('.././sectioneducation/educationprocessor');
let personalInfoprocessor = require('.././sectionpersonalinfo/personalinfoprocessor');
let projectprocessor = require('.././sectionproject/projectprocessor');
let workProcessor = require('.././sectionworkexperiance/workprocessor');
let qboxProcessor = require('.././questionbox/qboxprocessor');

function getprofile(candidateId, successCB, errorCB) {
    profile.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            errorCB(error);
        }

        successCB(result);
    });
}

function createNewprofile(profileobj, successCB, errorCB) {
    let projectObj = new profile({

        candidateid: profileobj.mobile,
        profession: profileobj.profession
    });

    projectObj.save(function(err, savedObj) {
        if (err) {
            errorCB(err);
        }

        successCB(savedObj);
    });
}
// , errorCB
function modifyprofile(profileobj, candidateid, successCB) {
    profile.update({ candidateid: candidateid }, profileobj.profile,

        function() {
            successCB('data updated');
        }

    );
}

function inspectMissingProfileFields(candidateId, successCB, errorCB) {
    let tasks = {
        skill: function(callback) {
            skillMissingFinder.findMissingFields(candidateId, function(result) {
                callback(null, result);
            }, function(err) {
                callback(err, null);
            });
        }, //end  skill 
        education: function(callback) {
            educationMissingFinder.findMissingEducationFields(candidateId, function(result) {
                callback(null, result);
            }, function(err) {
                callback(err, null);
            });
        }, //end education

        personalinfo: function(callback) {
            personalInfoMissingFinder.findPersonalInfoMissingFields(candidateId, function(result) {
                callback(null, result);
            }, function(err) {
                callback(err, null);
            });
        }, //end personal info

        project: function(callback) {
            projectMissingFinder.findProjectInfoMissingFields(candidateId, function(result) {
                callback(null, result);
            }, function(err) {
                callback(err, null);
            });
        }, //end project
        workexp: function(callback) {
            workMissingFinder.findWorkMissingFields(candidateId, function(result) {
                callback(null, result);
            }, function(err) {
                callback(err, null);
            });
        }
    };

    try {
        async.parallel(tasks, function(err, result) {
            if (err) {
                errorCB(err);
            }
            console.log("Missing profile fields of candidate: "+ candidateId + " result: ",
                result);

            successCB(result);
        });
    } catch (err) {
        console.log("error in inspecting for missing profile fields: ", err);
        errorCB(err);
    }
}

function updateMissingFieldResponse(candidateId, sectionName, instancename, fieldname, answer, callback) {
            
                let missingFieldResUpdateTasks = {
                    "skills": skillprocessor.addMissingSkillFieldResponse,
                    "qualification": educationProcessor.addMissingEducationFieldResponse,
                    "personalinfo": personalInfoprocessor.addMissingPersonalInfoFieldResponse,
                    "project":  projectprocessor.addMissingProjectFieldResponse,
                    "workexperience": workProcessor.addMissingWorkFieldResponse,
                }

                let closureObj = missingFieldResUpdateTasks[sectionName];
                if(closureObj) {
                    closureObj(candidateId, instancename, fieldname, answer, function(result){
                        var obj = {
                                section: sectionName,
                                fieldname: fieldname,
                                instancename: instancename,
                                response: answer
                            };

                            //call qbox processor fxn to set status as closed
                            qboxProcessor.setClosedStatusQuestion(candidateId, obj,
                                function(result) {
                                    callback(null, result);
                                },
                                function(err) {
                                    callback(err, null);
                                });
                        }, function(err){
                                callback(err, null);
                        })
                }

                    //Check which section this response was for 
                    //Call corresponding section's process's method to update the response in the corresponding instance 

}

module.exports = {

    createNewprofile: createNewprofile,
    getprofile: getprofile,
    modifyprofile: modifyprofile,
    inspectMissingProfileFields: inspectMissingProfileFields,
    updateMissingFieldResponse: updateMissingFieldResponse
};
