let router = require('express').Router();
let skillProcessor = require('./skillprocessor');
let skillRelationBuilder = require('./skillrelationbuilder');
let professionstoskillprocessor = require('./professionstoskillprocessor');
let skill = require('./skillschema');
let qboxProcessor = require('.././questionbox/qboxprocessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');
let skillMissingFinder = require('.././questionbox/skillMissingFinder');
let redis = require("redis");
let client = redis.createClient();

/*Get the skills for the given candidate id*/
//HHTP GET skill/:candidateid
//effective URL skill/:candidateid
router.get("/:candidateid", function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.SKILLS);
},function(req, res) {
      try {
        skillProcessor.getSkill(req.params.candidateid,
            function(skill1) {
            // client.rpush('profilecrawling', req.params.candidateid);
                res.status(200).json(skill1);
            },
            function(err) {
                res.status(500).json(err);
            });
    } catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }

});

/* Add new skill with candidate id only if the candidate is registered*/
// HTTP POST /skill/:candidateid

//effective url  /skill/:candidateid
router.post("/:candidateid", function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0], constants.CREATE,constants.SKILLS);
},function(req, res) {
    try {
    skill.find({
        candidateid: req.params.candidateid
    }, function(err, result) {
        if (err) {
           console.log('Error in posting new skill for cnadidate ', err);
        }

        if (!result) {
            return res.status(200).send('Candidate skill record not found');
        }

        if (result == "") {
            res.status(500).send(
                "Register candidate for the given candidate id");
        } //end if
        else {

                skillProcessor.addSkill(req.body, req.params.candidateid,
                    function(skills, id) {
                        skillRelationBuilder.skillRelationBuilder(
                            skills, id,
                            function(err, success) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("created relationship");
                                }
                            });
                        console.log("Skill added")
												client.rpush('profilecrawling', req.params.candidateid);
                        res.status(201).json(skills);
                    },
                    function(err) {
                        console.log("Error occurred in adding skill: ", err);
                        res.status(500).send("invalid data");
                    });
            } // end catch

    });
    }
    catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            } // end find
}); // end post//end try


/* Update a given skill by passing the skillname for the given candidate id..
					NOTE:(provide the skill object with evry field)*/
// HTTP PATCH /skill/:candidateid/:skillname
// effective url /skill/:candidateid/:skillname
router.patch('/:candidateid/:skillname', function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.EDIT,constants.SKILLS);
},function(req, res) {
	skill.find({
		candidateid: req.params.candidateid
	}, function(err, result) {
		if (result === '') {
			res.status(500).send(
				'skill section doesnt exist while updating new skill');
		} else {
			try {
				skillProcessor.updateSkill(req.params.skillname, req.body,
					req.params.candidateid,
					function(skill2) {
						console.log("Skill patched")
						// client.rpush('profilecrawling', req.params.candidateid);
						res.status(201).json(skill2);
					},
					function(err2) {
						res.status(500).send('Invalid data');
					});
			} // end try
			catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
		} // end else
	}); // end find
}); // end patch

// ---------------delete skill ------------
router.delete('/:candidateid/:skillname',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.DELETE,constants.SKILLS);
}, function(req, res) {
	skill.find({
		candidateid: req.params.candidateid
	}, function(err, result) {
		if (result === '') {
			res.status(500).send(
				'skill section doesnt exist while deleting new skill');
		} else {
			try {
				skillProcessor.deleteASkill(req.params.skillname ,
					req.params.candidateid ,
					function(skill, id) {
						skillRelationBuilder.skillRelationDelete(
							skill, id,
							function(err, success) {
								if (err) {
									console.log(err);
								} else {
									 console.log("deleted relationship");
								}
							});

						res.status(201).json(skill);
					},
					function(err) {
						res.status(500).send("invalid data");
					});
			} // end try
			catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
		} // end else
	}); // end find
}); // end delete

module.exports = router;
