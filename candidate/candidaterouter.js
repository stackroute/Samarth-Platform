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
var neopersonalinfo = require('../sectionpersonalinfo/personalinfoneoprocessor');

/* Get the Candidate Collection with the given Candidate id  */
//HTTP GET /candidate/:candidateid /
//effective url /candidate/:candidateid
router.get("/:candidateid", function(req, res) {
    console.log("Inside get");
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
                                // console.log("************************",personalinfoobj)
                                neopersonalinfo.createNode(personalinfoobj,function(err,succ) {
                                    if(err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log(succ);
                                    }
                                });
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
                    }
                },
                function(err, results) {
                    if (err) {
                        console.log('ERR: ', err);
                        return res.status(500).json({
                            msg: err
                        });
                    }

                    console.log("final result", results)
                            // return res.status(201).json({ msg: "done", result: results });
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
            console.log("candidate id:", req.body.candidateid);
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
