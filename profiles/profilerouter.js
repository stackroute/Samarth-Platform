var router = require('express').Router();
var profileprocessor = require('./profileprocessor');
var profile = require('./profileschema');

router.get("/:candidateid", function(req, res) {
    console.log("Inside get");
    try {
        profileprocessor.getprofile(req.params.candidateid,
            function(profileObj) {
                res.status(200).json(profileObj);
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
router.post("/:candidateid", function(req, res) {

    profile.find({ "candidateid": req.params.candidateid }, function(error, profiles) {
        if (profiles == "") {

            // console.log("inside adding new profile",req.body.profile[0].candidateType);
            try {
                profileprocessor.createNewprofile(req.body, req.params.candidateid,
                    function(profileObj) {
                        res.status(201).json(profileObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    }
                );
            } catch (err) {
                console.log("Error occurred in creating new employee: ", err);
                res.status(500).json({
                    error: "Internal error occurred, please report"
                });
            }
        }
    });
});

module.exports = router;
