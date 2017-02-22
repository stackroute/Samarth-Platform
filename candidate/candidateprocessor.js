let candidate = require('./candidateschema');
let async = require('async');
let profileprocessor = require('../profiles/profileprocessor');
let educationprocessor = require('../sectioneducation/educationprocessor');
let personalInfoprocessor = require(
    '../sectionpersonalinfo/personalinfoprocessor');
let projectprocessor = require('../sectionproject/projectprocessor');
let jobpreferencesProcessor = require('../sectionjobpreferences/jobpreferencesprocessor');
let skillprocessor = require('../sectionskill/skillprocessor');
let workexpprocessor = require('../sectionworkexperiance/workprocessor');
let candidateneo = require('./candidateneoprocessor');
let verificationprocessor = require('../verification/verificationprocesser');
let UserModel = require('./users');

function getcandidate(candidateId, successCB, errorCB) {
    candidate.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            // console.log(error);
            errorCB(error);
        }

        successCB(result);
    });
}

function signup(formObj, successCB, errorCB) {
    let newUserObj = new UserModel({
        uname: formObj.mobile,
        pwd: formObj.password,
        status: 'active',
        createdon: new Date(),
        lastseenon: new Date()
    });

    newUserObj.save(function(err, user) {
        if (err) {
            console.error('Error in signup user ', err);
            errorCB(err);
         }
         successCB(user);

    });
};

function createNewcandidate(formObj, successCB, errorCB) {
    //console.log('formObj ------->',formObj);
    let candidateObj = new candidate({
        "candidateid": formObj.mobile,
        /*"profession": formObj.profession*/
    });
    candidateObj.save(function(err, savedObj) {
        if (err) {
            // console.log('Error in saving candidate: ', err);
            errorCB(err);
        }
        successCB(savedObj);
    });
}
function initializeNewCandidateProfile(data, initCallback) {
    async.parallel({
            signup: function(callback) {
                signup(data,
                    function(candidateobj) {
                        callback(null, candidateobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            candidate: function(callback) {
                createNewcandidate(data,
                    function(candidateobj) {
                        callback(null, candidateobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            profile: function(callback) {
                profileprocessor.createNewprofile(data,
                    function(profileobj) {
                        callback(null, profileobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            education: function(callback) {
                educationprocessor.createNewEducation(data,
                    function(educationobj) {
                        callback(null, educationobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            personalinfo: function(callback) {
                personalInfoprocessor.createNewpersonalinfo(data,
                    function(personalinfoobj) {
                        callback(null, personalinfoobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            project: function(callback) {
                projectprocessor.createNewProject(data,
                    function(projectobj) {
                        callback(null, projectobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            skill: function(callback) {
                skillprocessor.createNewSkill(data,
                    function(skillobj) {
                        callback(null, skillobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            workexp: function(callback) {
                workexpprocessor.createworkexp(data,
                    function(workexpobj) {
                        callback(null, workexpobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                )
            },
            verificationdata: function(callback) {
                verificationprocessor.createNewVerification(data,
                    function(verifyobj) {
                        callback(null, verifyobj);
                    },
                    function(err) {
                        callback(err, null);
                    })
            },
            jobpreferences: function(callback) {
                jobpreferencesProcessor.createNewPreferences(data,
                    function(preferenceobj) {
                        callback(null, preferenceobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                );
            },

        },
        function(err, results) {
            if (err) {
                console.log('Error in candidate registration process: ', err);
                initCallback(err, null);
                return;
            }
            candidateneo.createCandidate(data, function(result){
                //success
                initCallback(null, results.personalinfo);
            }, function(){
                //error
                console.log("Error in createCandidate from neo: ", err);
                initCallback(err, null);
            });
        }
    ); //end of Async
} // end of initializeNewCandidateProfile

function registerNewCandidate(data) {
    let promise = new Promise(function(resolve, reject) {
        try {
        console.log('...............registerNewCandidate');
        console.log(data);
            //create every section,candidate,profile if candidate is created for first time
            candidate.find({"candidateid": data.mobile},
                function(err, candidate) {
                    console.log("Candidate: ", candidate, " for ", data.mobile);
                    if(err) {
                        reject(err);
                    }
                    if (candidate == "") {
                        initializeNewCandidateProfile(data, function(err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } //end if
                    else {
                        reject("Candidate already exists..!");
                    }
                }); //end find
        } catch (err) {
            console.error("Error in registration of candidate ", err);
            reject({ error: "Internal error occurred, please report or try later...!" });
        }
    });

    return promise;
}

function updatecandidate(newcandidateObj, candidateid, successCB, errorCB) {
    candidate.update({ candidateid: candidateid }, newcandidateObj,
        function() {
            successCB('candidate updated');
        }

    );
}

module.exports = {

    createNewcandidate: createNewcandidate,
    getcandidate: getcandidate,
    registerNewCandidate: registerNewCandidate,
    updatecandidate: updatecandidate,
    signup : signup
};
