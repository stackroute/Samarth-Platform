let router = require('express').Router();
let candidate = require('../candidate/candidateschema');
let async = require('async');
let AWS = require('aws-sdk');

let profileprocessor = require('../profiles/profileprocessor');
let personalInfoprocessor = require('../sectionpersonalinfo/personalinfoprocessor');
let jobpreferencesprocessor = require('../sectionjobpreferences/jobpreferencesprocessor');
let projectprocessor = require('../sectionproject/projectprocessor');
let skillprocessor = require('../sectionskill/skillprocessor');
let workexpprocessor = require('../sectionworkexperiance/workprocessor');
let candidateneo = require('../candidate/candidateneoprocessor');


router.get('/allcandidates', function(req, res) {
    try{
    candidate.find(function(err, candidates) {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            let candidateid = {};
            return res.status(201).json({ results: candidates });
        } // end of else
    });
    }
    catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            } // end of find
});


// This will return all the candidates in the circle
router.get('/searchcandidate/:circle', function(req, res) {
   try{
    candidateneo.getcircle(req.params.circle, function(candidates) {
        res.status(200).json(candidates);
    }, function(err) {
        res.status(500).json(err);
    });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
}); // end of get /candidatesearch

router.get('/aws',function (req,res) {
    try {
        // AWS.config.region = 'ap-south-1';
        // AWS.config.update({ accessKeyId: 'AKIAIEJFMACVX4TI2O5A', secretAccessKey: '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' });
        let config = new Object();
        config.region = "ap-south-1";
        config.secretAccessKey = "Ndm+yjnD949FcowVNHV7tjVI2PLiERT4XFV2nmzH";
        config.accessKeyId = "AKIAIEJFMACVX4TI2O5A";
        config.Bucket = "samarthuploads";
        // config = {
        //     region = "ap-south-1",
        //     secretAccessKey= "Ndm+yjnD949FcowVNHV7tjVI2PLiERT4XFV2nmzH",
        //     accessKeyId = "AKIAIEJFMACVX4TI2O5A",
        //     Bucket = "samarthuploads"
        // };
        // let bucket = new AWS.S3({ params: { Bucket: 'samarthuploads', maxRetries: 10 }, httpOptions: { timeout: 360000 } });
        // console.log('bucket');
        // console.log(bucket);
        res.json(config);
        // res.status(200).json(bucket);
        // console.log(res);
    } catch(e) {
        // statements
        console.log(e);
        res.status(500).json({
                    error: 'Error connecting to storage server!'
                });
    }
    /* body... */
}); //end of get /aws


/* Get the all sections of the candidates that is required to show in skill card*/
// HTTP GET /skillcard/:candidateid
// effective url /skillcard/:candidateid

router.get('/:candidateid', function(req, res) {
    try{
        console.log("candidate is is");
        console.log(req.params.candidateid);
    candidate.find({ candidateid: req.params.candidateid }, function(error, candidate) {
        if (candidate === '') {
            res.status(500).send('Candidate doesnt exist.. Register with candidate id');
        } else {
            async.parallel({
                    personalinfo: function(callback) {
                        personalInfoprocessor.getPersonalinfo(req.params.candidateid,
                            function(personalinfoobj) {
                                console.log("personalinfoobj is");
                                console.log(personalinfoobj);
                                callback(null, personalinfoobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    },
                    jobpreferences: function(callback) {
                        jobpreferencesprocessor.getPreferences(req.params.candidateid,
                            function(preferenceobj) {
                                callback(null, preferenceobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    },
                    project: function(callback) {
                        projectprocessor.getProject(req.params.candidateid,
                            function(projectobj) {
                                callback(null, projectobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    },
                    skill: function(callback) {
                        skillprocessor.getSkill(req.params.candidateid,
                            function(skillobj) {
                                callback(null, skillobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    },
                    workexp: function(callback) {
                        workexpprocessor.getworkexp(req.params.candidateid,
                            function(workexpobj) {
                                callback(null, workexpobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    },
                    profile: function(callback) {
                        profileprocessor.getprofile(req.params.candidateid,
                            function(profileobj) {

                                callback(null, profileobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                        );
                    }
                },
                function(err, results) {
                    if (err) {
                        return res.status(500).json({ msg: err });
                    }
                    console.log("results is");
                                console.log(results);
                    return res.status(201).json({ result: results });
                }
            ); // end of Async
        } // end else
    }); // end find
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
}); // end get
module.exports = router;

