let router = require('express').Router();
let projectProcessor = require('./projectprocessor');
let project = require('./projectschema');
let projectRelationBuilder = require('./projectRelationBuilder');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');
/* get all project for the given candidate id */
// HTTP GET project/:candidateId
// effective url project/:candidateId
router.get('/:candidateId', function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.CANDIDATE , constants.READ,constants.CANDIDATE);
}, function(req, res) {
    try {
        let projectObj = projectProcessor.getProject(req.params.candidateId,
            function(projectObj) {
                res.status(200).json(projectObj);
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
/* Add project for the given candidate id only after registration */
// HTTP POST project/:candidateId
// effective url project/:candidateId
router.post('/:candidateId', function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.CANDIDATE , constants.CREATE,constants.CANDIDATE);
},function(req, res) {
    try {
    project.find({ candidateid: req.params.candidateId }, function(err, result) {
        if (result === '') {
            res.status(500).send('Register the candidate first before adding a project');
        } // end if
        else {
                    projectProcessor.addProject(req.body, req.params.candidateId,
                    function(projectObj, candidateId) {
                         projectRelationBuilder.projectRelationBuilder(candidateId,
                            projectObj.name,
                            projectObj.durationInMonths,
                            projectObj.location,
                            projectObj.skills,
                            projectObj.client,
                            projectObj.role,
                            function(err, success) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("created relationship");
                                }
                            });
                        res.status(201).json(projectObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    });
               }
         });
    }
    catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
     // end find
});


/* Update a project by passing the passing name in the api for the given candidate id
            NOTE:(send every field of the project obj while updating in the body) */
// HTTP POST project/:candidateId/:projectName
// effective url project/:candidateId/:projectName
router.patch('/:candidateId/:projectName',function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.CANDIDATE , constants.EDIT,constants.CANDIDATE);
}, function(req, res) {
    try{
    project.find({ candidateid: req.params.candidateId }, function(err, result) {
        if (result === '') {
            res.status(500).send('Add Project with Candidate id before update');
        } else {
                    projectProcessor.updateProject(req.params.projectName, req.body,
                    req.params.candidateId, function(projectObj) {
                        res.status(201).json(projectObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    });

            }
    });
}
    catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
});
 module.exports = router;
