var router = require('express').Router();
var candidate = require('../candidate/candidateschema');
var async = require('async');

var personalInfoprocessor = require('../sectionpersonalinfo/personalInfoprocessor');
var projectprocessor = require('../sectionproject/projectprocessor');
var skillprocessor = require('../sectionskill/skillprocessor');
var workexpprocessor = require('../sectionworkexperiance/workprocessor');


router.get('/',function(req,res) {
    candidate.find(function(err,candidates) {
      if (err) {
        console.log(err);
    } else {

        var details = [];
        for(var i = 0;i<candidates.length ; i++) {
            async.parallel({

                personalinfo : function(callback) {
                  personalInfoprocessor.getPersonalinfo(candidates[i].candidateid,
                      function(personalinfoobj) {

                        callback(null,personalinfoobj)
                    }),function(err){

                    callback(err,null);
                }
            },
            project: function(callback) {
                projectprocessor.getProject(candidates[i].candidateid,
                    function(projectobj) {
                        callback(null, projectobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                    )
            },
            skill: function(callback) {
                skillprocessor.getSkill(candidates[i].candidateid,
                    function(skillobj) {
                        callback(null, skillobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                    )
            },
            workexp: function(callback) {
                workexpprocessor.getworkexp(candidates[i].candidateid,
                    function(workexpobj) {
                        callback(null, workexpobj);
                    },
                    function(err) {
                        callback(err, null);
                    }
                    )
            }
        },function(err,results){
            if(err){
              console.log('ERR: ', err);
              return res.status(500).json({ msg: err });
          }else{
            // console.log( "**********************************************from api", results);
            details.push(results);
            console.log("pushed",details);
        }
    }

        );//endofAsync

      }//end of for
      console.log("about to return");
      return res.status(201).json({result : details});

    }// end of else
  });//end of find
});// end of get /




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
