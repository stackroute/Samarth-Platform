var router = require('express').Router();
var qboxquestions = require('./qboxquestions');
var qboxProcessor = require('./qboxprocessor');

var async = require('async');
var fieldQCache = require('./fieldQCache');

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
        var lang = (req.query.lang) ? req.query.lang : 'English';

        var question = qboxProcessor.getQuestions(req.params.candidateid,
            sections,
            skip,
            limit,
            function(colln) {
                async.map(colln,
                    function(question, cb) {
                        fieldQCache.getFieldQuestion(question.section, question.fieldname, lang,
                            function(err, query) {
                                var transformed = JSON.stringify(question);
                                transformed = JSON.parse(transformed);
                                transformed['query'] = query;
                                transformed['lang'] = lang;
                                cb(null, transformed);
                            });
                    },
                    function(err, questionColln) {
                        if (err) {
                            return res.status(500).json(err);
                        }

                        return res.status(200).json(questionColln);
                    }
                );
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

/**
 *Api for returning final query object with combination of questions and fieldquestions
 */
// HTTP GET /candidate/:candidateid/qboxquestions/queries/
//     ?section=[multiple values]&limit=&skip&lang=
// Effective url is /candidate/:candidateid/qboxquestions/queries
router.get("/:candidateid/qboxquestions/queries", function(req, res) {

    if (!req.params.candidateid) {
        throw new Error("Invalid request, requesting questions without candidate..!");
    }

    try {
        var sections = (req.query.sections) ? req.query.sections.split(",") : [];
        var limit = (req.query.limit) ? req.query.limit : 3;
        var skip = (req.query.skip) ? req.query.skip : 0;
        var lang = (req.query.lang) ? req.query.lang : 'English';

        var question = qboxProcessor.getqueryObject(req.params.candidateid,
            sections,
            skip,
            limit,
            lang,
            function(question) {

                res.status(200).json(question);
                res.end();
            },
            function(err) {
                res.status(500).json(err);
            });

    } catch (err) {
        console.log("Error occurred in fetching queryObject: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

// Effective url is /candidate/:candidateid
router.post("/:candidateId", function(req, res) {

    console.log("inside adding question req", req.body.section);

    try {
        qboxProcessor.createNewQuestions(req.body, req.params.candidateId,
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
