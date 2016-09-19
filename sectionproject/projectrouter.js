var router = require('express').Router();
var projectProcessor = require('./projectprocessor');
var project = require('./projectschema');

router.get("/:candidateId", function(req, res) {
    try {
        var projectObj = projectProcessor.getProject(req.params.candidateId,
            function(projectObj) {
                res.status(200).json(projectObj);
            },
            function(err) {
                res.status(500).json(err);
            });

    } catch (err) {
        console.log("Error occurred in fetching project: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

router.get("/", function(req, res) {

    try {
        projectProcessor.findAllProject(
            function(projectObj) {
                res.status(200).json(projectObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Error occurred in modifying old project: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

router.post("/:candidateId", function(req, res) {

    console.log("inside adding project", req.body);

    project.find({ "candidateid": req.params.candidateId }, function(err, result) {
        if (result == "") {
            try {
                projectProcessor.createNewProject(req.body, req.params.candidateId,
                    function(projectObj) {
                        res.status(201).json(projectObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    }
                );
            } catch (err) {
                console.log("Error occurred in adding project: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            }
        } else {
            try {
                projectProcessor.modifyProject(req.body, req.params.candidateId,
                    function(projectObj) {
                        res.status(201).json(projectObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    }
                );
            } catch (err) {
                console.log("Error occurred in modifying old project: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            }
        }
    });
}); //end post

router.patch("/:candidateId/:projectName", function(req, res) {
    try {
        projectProcessor.updateProject(req.params.projectName, req.body, req.params.candidateId,
            function(projectObj) {
                res.status(204).json(projectObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Error occurred in updating: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

router.delete("/:candidateId/:projectName", function(req, res) {
    try {
        projectProcessor.deleteProject(req.params.candidateId, req.params.projectName,
            function(projectObj) {
                res.status(202).json(projectObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Error occurred in deleting old project: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

module.exports = router;
