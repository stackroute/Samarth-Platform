var router = require('express').Router();
var quesgenerator = require('./quesgenerator');
var question = require('./questionschema');

router.get("/:candidateId/:section", function(req, res) {
    try {
        var question = quesgenerator.getquestions(req.params.candidateId,req.params.section,
            function(question) {
               
                res.status(200).send(question);
                res.end();
            },
            function(err) {
                res.status(500).json(err);
            });

    } catch (err) {
        console.log("Error occurred in fetching questions: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

router.post("/:candidateId", function(req, res) {

    console.log("inside adding question", req.body);

    question.find({ "candidateid": req.params.candidateId }, function(err, result) {
        if (result == "") {
            try {
                quesgenerator.createNewQuestions(req.body, req.params.candidateId,
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
                quesgenerator.modifyQuestions(req.body, req.params.candidateId,
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

module.exports = router;