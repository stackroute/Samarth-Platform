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

    function getcandidate(candidateId, successCB, errorCB) {
        candidate.find({ candidateid: candidateId }, function(error, result) {
            if (error) {
                // console.log(error);
                errorCB(error);
            }

            successCB(result);
        });
    }

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

    function candidateProfileProcessor(data, successCB, errorCB) {
        try {
        candidateneo.createCandidate(data, function(stat) {
            console.log("stat-------------------->", stat);
            
        // create every section,candidate,profile if candidate is created for first time
        candidate.find({
            candidateid: data.mobile
        }, function(error, candidate) {

            /*if (candidate === '') {*/
                if (candidate.length == 0) {

                // console.log('inside ifffffffffffffffffffffffffffff--->',candidate.length);
                async.parallel({
                    candidate: function(callback) {
                        createNewcandidate(data,
                            function(candidateobj) {
                                callback(null, candidateobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    profile: function(callback) {
                        profileprocessor.createNewprofile(data,
                            function(profileobj) {

                                callback(null, profileobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    education: function(callback) {
                        educationprocessor.createNewEducation(data,
                            function(educationobj) {
                                callback(null, educationobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    personalinfo: function(callback) {
                        personalInfoprocessor.createNewpersonalinfo(data,
                            function(personalinfoobj) {
                                callback(null, personalinfoobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    project: function(callback) {
                        projectprocessor.createNewProject(data,
                            function(projectobj) {
                                callback(null, projectobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
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
                    skill: function(callback) {
                        skillprocessor.createNewSkill(data,
                            function(skillobj) {
                                callback(null, skillobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    workexp: function(callback) {
                        workexpprocessor.createworkexp(data,
                            function(workexpobj) {
                                callback(null, workexpobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    verificationdata: function(callback) {
                        verificationprocessor.createNewVerification(data,
                            function(verifyobj) {
                                callback(null, verifyobj);
                            },
                            function(err) {
                                callback(err, null);
                            });
                    }

                },
                function(err, results) {
                    if (err) {
                        console.log('ERR ----------------->: ', err);
                        // // return res.status(500).json({
                        //     msg: err
                        // });
                    }

                    // return res.status(201).json(results.personalinfo);
                }
                ); // end of Async
            } // end if
            else {
                // return res.status(500).send('Candidate already exists, try editing instead...!');
            }
        }); // end find
        }, function(){
            console.log("err--------------------->", err);
            // should we not return from here cos error occurred?
        });

} catch (err) {
    console.log("Internal Error Occurred inside catch");
    
}
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
        candidateProfileProcessor: candidateProfileProcessor,
        updatecandidate: updatecandidate

    };
