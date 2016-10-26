var router = require('express').Router();
var async = require('async');

var candidateprocessor = require('./candidateprocessor');
var candidate = require('./candidateschema');
var profileprocessor = require('../profiles/profileprocessor');
var educationprocessor = require('../sectioneducation/educationprocessor');
var personalInfoprocessor = require(
    '../sectionpersonalinfo/personalInfoprocessor');
var projectprocessor = require('../sectionproject/projectprocessor');
var skillprocessor = require('../sectionskill/skillprocessor');
var workexpprocessor = require('../sectionworkexperiance/workprocessor');
var candidateneo = require('./candidateneoprocessor');
var verificationprocessor = require('../verification/verificationprocesser');



router.post("/parse", function(req, res) {
    console.log("****************************************************Request", req.body);
    try {
        var data = [];
        async.parallel({

            profession: function(callback) {
                candidateneo.parseprofession(req.body,
                    function(profession) {
                        callback(null, profession);
                    },
                    function(err) {
                        callback(err, null);
                    });
            },
            location: function(callback) {
                candidateneo.parselocation(req.body,
                    function(location) {
                        callback(null, location);
                    },
                    function(err) {
                        callback(err, null);
                    });
            },
            skill: function(callback) {
                candidateneo.parseskill(req.body,
                    function(skill) {
                        callback(null, skill);
                    },
                    function(err) {
                        callback(err, null);
                    });
            }

        }, function success(err, query) {
            if (err) {
                res.status(500).json({ msg: err });
            } else {
                console.log("*********************************QUERY", query);
                console.log("dhekav", query.skill);
                candidateneo.searchquery(query, function(results) {
                    res.status(200).json(results);
                }, function(err) {
                    res.status(500).json({ message: "No matches found" });
                });
            }
        });


        // candidateneo.parseprofession(req.body,function(profession) {
        //     console.log("Found profession in search text",profession);
        //     if(profession!="") {
        //         console.log(profession);
        //         data.push(profession);
        //     }
        // },function(err) {
        //     res.status(500).json(err);
        // });

        // candidateneo.parselocation(req.body,function(location) {
        //     console.log("Found profession in search text",location);
        //     if(location!="") {
        //         console.log(location);

        //         data.push(location)
        //     }
        // },function(err) {
        //     res.status(500).json(err);
        // });

        // candidateneo.parseskill(req.body,function(skill) {
        //     console.log("Found profession in search text",skill);
        //     if(skill!="") {
        //         console.log(skill);

        //         data.push(skill);
        //     }
        // },function(err) {
        //     res.status(500).json(err);
        // });

        // console.log("finally parsed query is",data);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




router.get("/profession", function(req, res) {
    try {
        console.log("insert in get profition");
        candidateneo.getProfessions(function(professions) {
            console.log("*******************************from route", professions);
            res.status(200).json(professions);
        }, function(err) {
            res.status(500).json(err);
        });
    } catch (err) {
        console.log("Error occurred in getting the professions: ", err);
        res.status(500).json({
            error: "Server error...try again later"
        });
    }
});




/* Get the Candidate Collection with the given Candidate id  */
//HTTP GET /candidate/:candidateid /
//effective url /candidate/:candidateid
router.get("/:candidateid", function(req, res) {
    // console.log("Inside get");
    try {
        candidateprocessor.getcandidate(req.params.candidateid,
            function(candidateObj) {
                res.status(200).json(candidateObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Error occurred in getting candidate object: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

/*Register the Candidate by creating Candidate and other collections using form data and default values */
//HTTP POST /candidate/:candidateid /
//effective url /candidate/
router.post("/", function(req, res) {
    try {

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
                        // createcandidate: function(callback) {
                        //     candidateneo.createCandidate(req.body,
                        //         function(success) {
                        //             callback(null,sucess);
                        //         },
                        //         function(err) {
                        //             callback(err,null);
                        //         }
                        //         )
                        // }
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

/*Update the candidate collection of the given candidate id NOTE:(Candidate id cant get update)*/
//HTTP PATCH /candidate/:candidateid /
//effective url /candidate/:candidateid

router.patch("/:candidateid", function(req, res) {
    candidate.find({
            "candidateid": req.params.candidateid
        }, function(error, candidate) {
            if (candidate = "") {

                res.status(500).send(
                    "Candidate doesnt exists, Add Candidate before updating...!");
            } else {
                // console.log("candidate id:", req.body.candidateid);
                if (!req.body.candidateid) {
                    try {
                        candidateprocessor.updatecandidate(req.body, req.params.candidateid,
                            function(candidateObj) {
                                res.status(201).json(candidateObj);
                            },
                            function(err) {
                                res.status(500).json(err);
                            }
                        );
                    } catch (err) {
                        console.log("Error occurred in updating candidate: ", err);
                        res.status(500).json({
                            error: "Internal error occurred, please report"
                        });
                    } //end catch
                } //end if
                else {
                    res.status(500).send("Alert! Can't update Candidate id... ");
                }
            } //end else

        }) //end find

});

module.exports = router;
