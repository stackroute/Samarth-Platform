let router = require('express').Router();
let async = require('async');

let candidateprocessor = require('./candidateprocessor');
let candidate = require('./candidateschema');
let profileprocessor = require('../profiles/profileprocessor');
let educationprocessor = require('../sectioneducation/educationprocessor');
let personalInfoprocessor = require(
    '../sectionpersonalinfo/personalinfoprocessor');
let projectprocessor = require('../sectionproject/projectprocessor');
let jobpreferencesProcessor=require('../sectionjobpreferences/jobpreferencesprocessor');
let skillprocessor = require('../sectionskill/skillprocessor');
let workexpprocessor = require('../sectionworkexperiance/workprocessor');
let candidateneo = require('./candidateneoprocessor');
let candidatesearchprocessor = require('./newcandidateneoprocessor');
let verificationprocessor = require('../verification/verificationprocesser');

router.get('/allCandidate',function(req,res)
{
    try
    {
        candidateneo.getAllCandidate(req.body,function(result,err){
            var cid=[];
            var cpersonal=[];
            if(err){
                console.log("error here"+err);
            }else{
                console.log("Its fetch all detail");
                
                for(i=0;i<result.length;i++)
                {
                    cid.push(result[i].name); 
                
                personalInfoprocessor.getPersonalinfo(result[i].name,function(cper,err){
                        if(err)
                        {
                            console.log(err)
                        }
                        else{
                            cpersonal.push(cper);
                              console.log(cper);
                            // cpersonal.push(cper);
                        }
                        
                    })
                }

                res.status(200).json(cid);

            }
        });

    }
    catch(err)
    {
        
    }
});

router.post('/search', function(req, res) {
    try {

        let searchQuery = req.body.searchquery;
        if(searchQuery) {
            searchQuery = searchQuery.trim();
        } else {
            searchQuery = '';
        }

        candidatesearchprocessor
        .getSearchArray(searchQuery)
        .then(function (searchArray) {
            if(searchArray.length>0){
                candidatesearchprocessor.getAllCandidates(searchArray).then(function(data){
                    console.log("data --->",data);
                    res.status(200).json(data);
                },function(err){
                    console.log("error in all candidates --->",err);
                });
            }else{
                //console.log('hello')
                res.status(500).json({ message: 'No matches found' });
            }
        },function (err) {
            console.log("Error happaned --->",err);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


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


/* Get the Candidate Collection with the given Candidate id  */
// HTTP GET /candidate/:candidateid /
// effective url /candidate/:candidateid
router.get('/:candidateid', function(req, res) {

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

        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});



/* Register the Candidate by creating Candidate and other collections using form data and default values */
// HTTP POST /candidate/:candidateid /
// effective url /candidate/
router.post('/', function(req, res) {
    console.log('during registeration entered into platform', req.body);
    try {
        candidateneo.createCandidate(req.body, function(err, stat) {
            console.log('nooooooooooooodes '+ req.body);
            if (err) {
                console.log("err--------------------->", err);
            } else {
                console.log("stat-------------------->", stat);
            }
        });
        // create every section,candidate,profile if candidate is created for first time
        candidate.find({
            candidateid: req.body.mobile
        }, function(error, candidate) {

            /*if (candidate === '') {*/
                if (candidate.length == 0) {

                // console.log('inside ifffffffffffffffffffffffffffff--->',candidate.length);
                async.parallel({
                    candidate: function(callback) {
                        candidateprocessor.createNewcandidate(req.body,
                            function(candidateobj) {
                                callback(null, candidateobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    profile: function(callback) {
                        profileprocessor.createNewprofile(req.body,
                            function(profileobj) {

                                callback(null, profileobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    education: function(callback) {
                        educationprocessor.createNewEducation(req.body,
                            function(educationobj) {
                                callback(null, educationobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    personalinfo: function(callback) {
                        personalInfoprocessor.createNewpersonalinfo(req.body,
                            function(personalinfoobj) {
                                callback(null, personalinfoobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    project: function(callback) {
                        projectprocessor.createNewProject(req.body,
                            function(projectobj) {
                                callback(null, projectobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
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
                    skill: function(callback) {
                        skillprocessor.createNewSkill(req.body,
                            function(skillobj) {
                                callback(null, skillobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    workexp: function(callback) {
                        workexpprocessor.createworkexp(req.body,
                            function(workexpobj) {
                                callback(null, workexpobj);
                            },
                            function(err) {
                                callback(err, null);
                            }
                            );
                    },
                    verificationdata: function(callback) {
                        verificationprocessor.createNewVerification(req.body,
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
                        return res.status(500).json({
                            msg: err
                        });
                    }

                    return res.status(201).json(results.personalinfo);
                }
                ); // end of Async
            } // end if
            else {
                return res.status(500).send('Candidate already exists, try editing instead...!');
            }
        }); // end find
} catch (err) {
    console.log("Internal Error Occurred inside catch");
    return res.status(500).send(
        'Internal error occurred, please report or try later...!');
}
});

/* Update the candidate collection of the given candidate id NOTE:(Candidate id cant get update)*/
// HTTP PATCH /candidate/:candidateid /
// effective url /candidate/:candidateid

router.patch('/:candidateid', function(req, res) {
   // console.log("patch Candidate");
   candidate.find({
    candidateid: req.params.candidateid
}, function(error, candidate) {
    if (candidate = '') {
        res.status(500).send(
            'Candidate doesnt exists, Add Candidate before updating...!');
    } else {

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

                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
                } // end catch
            } // end if
            else {
                res.status(500).send('Alert! Can\'t update Candidate id... ');
            }
        } // end else
    }); // end find
});

module.exports = router;

