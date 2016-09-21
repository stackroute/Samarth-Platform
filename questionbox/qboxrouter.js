var router = require('express').Router();

var fieldquestions = require('./fieldquestions');
var qboxquestions = require('./qboxquestions');

var qboxProcessor = require('./qboxprocessor');

/**
 * API for returning questions pending to be answered by the candidate for completion or updation of profile
 * Supports filtering for a given section of the profile, paginate the questions
 */
// HTTP GET /candidate/:candidateid/qboxquestions
// ?sections=[multiple values]&limit=&offset
// Effective url is /candidate/:candidateid/qboxquestions
router.get("/:candidateid/qboxquestions/", function(req, res) {
    if (!req.params.candidateid) {
        throw new Error("Invalid request, requesting questions without candidate..!");
    }

    try {
        // sections=[multiple values] Eg: sections='skills,qualification,projects'
        var sections = (req.query.sections) ? req.query.sections.split(",") : [];
        var limit = (req.query.limit) ? req.query.limit : 3;
        var skip = (req.query.skip) ? req.query.skip : 0;

        var question = qboxProcessor.getQuestions(req.params.candidateid,
            sections,
            skip,
            limit,
            function(questionColln) {
                res.status(200).json(questionColln);
                res.end();
            },
            function(err) {
                //log the err
                res.status(500).json(err);
            });
    } catch (err) {
        console.log("Unexpected error occurred in fetching qbox questions: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});


/*HTTP GET / fieldquestions / : section /
    ? fieldname = [multiple values] & lang = [multiple values]
*/
router.get("/:section", function(req, res) {
            try {
                var question = qboxProcessor.getfieldquestions(req.params.section,
                    req.params.lang,
                    function(question) {

                        res.status(200).json(question);
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

        }

        /* router.get("/:lang", function(req, res) {
             console.log("Inside ques collection get req limit=", req.query.limit);
             console.log("Inside ques collection get req offset=", req.query.offset);
             try {
                 var question = qboxProcessor.getAllfieldquestions(req.params.lang,
                     function(question) {

                         res.status(200).json(question);
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
         });*/

        /*
        router.get("/:section/:lang", function(req, res) {
            console.log("Inside ques collection get req");
            try {
                var question = quesprocessor.getfieldquestions(req.params.section, req.params.lang,
                    function(question) {

                        res.status(200).json(question);
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
        });*/

        /*router.get("/:section/:name", function(req, res,next) {
            console.log("Inside fieldquestions get");
            try {
                   var question=quesprocessor.getfieldquestions(req.params.section,
                    function(question) {
                       
                       res.status(200).json(question);
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
            next()
        });

        router.get("/:candidateId/:qboxquestions", function(req, res) {
            console.log("Inside qboxquestions get req1")
            try {
                var question = quesprocessor.getquestions(req.params.candidateId,
                    function(question) {
                       
                        var result=res.status(200).json(question);
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
        });*/

        router.get("/:candidateId/:qboxquestions/:section", function(req, res) {
            console.log("Inside qboxquestions get req2")
            try {
                var question = quesprocessor.getquestionsFromSections(req.params.candidateId, req.params.section,
                    function(question) {

                        var result = res.status(200).json(question);
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

            console.log("inside adding question req", req.body.section);

            try {
                quesprocessor.createNewQuestions(req.body, req.params.candidateId,
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

        }); //end post

        router.post("/", function(req, res) {

            console.log("inside adding field ques", req.body);

            try {
                quesprocessor.createNewFieldQuesn(req.body,
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

        }); //end post

        module.exports = router;
