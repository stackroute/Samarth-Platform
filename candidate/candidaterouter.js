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
let candidateneo = require('./candidateneoprocessor');
let candidatesearchprocessor = require('./newcandidateneoprocessor');
let verificationprocessor = require('../verification/verificationprocesser');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');


router.get('/allCandidate',function(req, res, next){
authorization.isAuthorized(req, res, next,constants.COORDINATOR , constants.READ,constants.COORDINATOR);
},
function(req,res)
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

router.post('/search',function(req, res, next){
authorization.isAuthorized(req, res, next,constants.COORDINATOR , constants.READ,constants.COORDINATOR);
},
function(req, res) {
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
                    res.status(200).json(data);
                },function(err){
                    console.log("error in all candidates --->",err);
                });
            }else{
                res.status(500).json({ message: 'No matches found' });
            }
        },function (err) {
            console.log("Error happaned --->",err);
        });
    } catch (err) {
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
router.get('/:candidateid',function(req, res, next){
authorization.isAuthorized(req, res, next,constants.COORDINATOR , constants.READ,constants.COORDINATOR);
},
 function(req, res) {

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




/* Update the candidate collection of the given candidate id NOTE:(Candidate id cant get update)*/
// HTTP PATCH /candidate/:candidateid /
// effective url /candidate/:candidateid

router.patch('/:candidateid',function(req, res, next){
authorization.isAuthorized(req, res, next,constants.COORDINATOR , constants.EDIT,constants.COORDINATOR);
},
function(req, res) {
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
