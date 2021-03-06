var router = require('express').Router();
var candidate = require('../candidate/candidateschema');
var async = require('async');

var personalInfoprocessor = require('../sectionpersonalinfo/personalinfoprocessor');
var projectprocessor = require('../sectionproject/projectprocessor');
var skillprocessor = require('../sectionskill/skillprocessor');
var workexpprocessor = require('../sectionworkexperiance/workprocessor');
var candidateneo = require('../candidate/candidateneoprocessor');


router.get('/allcandidates',function(req,res) {
    candidate.find(function(err,candidates) {
      if (err) {
        console.log(err);
        return res.status(500).json({message:err});
    } else {
        var candidateid = {};
        console.log ("Found candidates",candidates);
        return res.status(201).json({results:candidates});
    }// end of else
  });//end of find  
});


//This will return all the candidates in the circle
router.get('/searchcandidate/:circle',function(req,res) {
  //   candidate.find(function(err,candidates) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({message:err});
  //   } else {
  //       var candidateid = {};
  //       console.log ("Found candidates",candidates);
  //       return res.status(201).json({results:candidates});
  //   }// end of else
  // });//end of find

  console.log(req.params.circle);
  candidateneo.getcircle(req.params.circle,function(candidates) {
    console.log("from router",candidates);
    res.status(200).json(candidates);
},function(err) {
    res.status(500).json(err);
});

});// end of get /candidatesearch




/*Get the all sections of the candidates that is required to show in skill card*/
//HTTP GET /skillcard/:candidateid
//effective url /skillcard/:candidateid

router.get("/:candidateid", function(req, res) {
    candidate.find({ "candidateid": req.params.candidateid }, function(error, candidate) {
        if (candidate == "") {
            res.status(500).send("Candidate doesnt exist.. Register with candidate id");
        } else {
            async.parallel({                    
                personalinfo: function(callback) {
                    personalInfoprocessor.getPersonalinfo(req.params.candidateid,
                        function(personalinfoobj) {
                            callback(null, personalinfoobj);
                        },
                        function(err) {
                            callback(err, null);
                        }
                        )
                },
                project: function(callback) {
                    projectprocessor.getProject(req.params.candidateid,
                        function(projectobj) {
                            callback(null, projectobj);
                        },
                        function(err) {
                            callback(err, null);
                        }
                        )
                },
                skill: function(callback) {
                    skillprocessor.getSkill(req.params.candidateid,
                        function(skillobj) {
                            callback(null, skillobj);
                        },
                        function(err) {
                            callback(err, null);
                        }
                        )
                },
                workexp: function(callback) {
                    workexpprocessor.getworkexp(req.params.candidateid,
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
                    return res.status(500).json({ msg: err });
                }

                console.log("final result", results)
                return res.status(201).json({ result: results });
            }
            ); //end of Async 
        } //end else
    }); //end find
}); //end get
module.exports = router;
