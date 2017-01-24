let router = require('express').Router();
let async = require('async');
let candidateprocessor = require('./candidateprocessor');
let candidate = require('./candidateschema');
let profileprocessor = require('../profiles/profileprocessor');
let educationprocessor = require('../sectioneducation/educationprocessor');
let personalInfoprocessor = require('../sectionpersonalinfo/personalinfoprocessor');
let projectprocessor = require('../sectionproject/projectprocessor');
let jobpreferencesProcessor=require('../sectionjobpreferences/jobpreferencesprocessor');
let skillprocessor = require('../sectionskill/skillprocessor');
let workexpprocessor = require('../sectionworkexperiance/workprocessor');
let galleryprocessor = require('../sectionprofilegallery/galleryprocessor');
let candidateneo = require('./candidateneoprocessor');
let verificationprocessor = require('../verification/verificationprocesser');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');
router.get('/profession', function(req, res) {
    try {
        candidateneo.getProfessions(function(professions) {
            res.status(200).json(professions);
        }, function(err) {
            res.status(500).json(err);
        });
    } catch (err) {
        res.status(500).json({
            error: 'Server error...try again later'
        });
    }
});
router.get('/location', function(req, res) {
    try {
        candidateneo.getProfessions(function(professions) {
            res.status(200).json(professions);
        }, function(err) {
            res.status(500).json(err);
        });
    } catch (err) {
        res.status(500).json({
            error: 'Server error...try again later'
        });
    }
});
/* Register the Candidate by creating Candidate and other collections using form data and default values */
// HTTP POST /candidate/:candidateid /
// effective url /candidate/
router.post("/", function(req, res) {
    try {
        console.log("******************************************************888888888888",req.body);
        candidateneo.createCandidate(req.body, function(err, stat) {
            if (err) {
                console.log(err);
            } else {
                //  console.log(stat);
            }
        });
        //create every section,candidate,profile if candidate is created for first time
        candidate.find({
            "candidateid": req.body.mobile
        }, function(error, candidate) {
            if (candidate == "") {
                async.parallel({
                        candidate: function(callback) {
                            candidateprocessor.createNewcandidate(req.body,
                                function(candidateobj) {
                                    callback(null, candidateobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        profile: function(callback) {
                            profileprocessor.createNewprofile(req.body,
                                function(profileobj) {
                                    // console.log("From Profile Processor",profileobj)
                                    // neoprofession.createProfessionNode(profileobj,function(err,succ) {
                                    //     if(err) {
                                    //         console.log(err);
                                    //     }else{
                                    //         console.log(succ);
                                    //     }
                                    // });
                                    callback(null, profileobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        education: function(callback) {
                            educationprocessor.createNewEducation(req.body,
                                function(educationobj) {
                                    callback(null, educationobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        personalinfo: function(callback) {
                            personalInfoprocessor.createNewpersonalinfo(req.body,
                                function(personalinfoobj) {
                                    callback(null, personalinfoobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        project: function(callback) {
                            projectprocessor.createNewProject(req.body,
                                function(projectobj) {
                                    callback(null, projectobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        skill: function(callback) {
                            skillprocessor.createNewSkill(req.body,
                                function(skillobj) {
                                    callback(null, skillobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        workexp: function(callback) {
                            workexpprocessor.createworkexp(req.body,
                                function(workexpobj) {
                                    callback(null, workexpobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            )
                        },
                        verificationdata: function(callback) {
                            verificationprocessor.createNewVerification(req.body,
                                function(verifyobj) {
                                    callback(null, verifyobj);
                                },
                                function(err) {
                                    callback(err, null);
                                })
                        },
                        jobpreferences: function(callback) {
                            jobpreferencesProcessor.createNewPreferences(req.body,
                                function(preferenceobj) {
                                    callback(null, preferenceobj);
                                },
                                function(err) {
                                    callback(err, null);
                                }
                            );
                        },
                        profilegallery: function(callback) {
                            galleryprocessor.createNewGallery(req.body,
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
                            console.log('ERR: ', err);
                            return res.status(500).json({
                                msg: err
                            });
                        }
                        return res.status(201).json(results.personalinfo);
                    }
                ); //end of Async
            } //end if
            else {
                return res.status(500).send(
                    "Candidate already exists, try editing instead...!");
            }
        }); //end find
    } catch (err) {
        console.error("Error in registration of candidate ", err);
        return res.status(500).send(
            "Internal error occurred, please report or try later...!");
    }
});
module.exports = router;
