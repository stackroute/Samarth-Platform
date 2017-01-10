let router = require('express').Router();
// let qboxquestions = require('./qboxquestions'); 
let qboxProcessor = require('./qboxprocessor');
// var qboxquestionModel = require('./qboxquestions');
let async = require('async');
let fieldQCache = require('./fieldQCache');
let skillprocessor = require('.././sectionskill/skillprocessor');
let educationProcessor  = require('.././sectioneducation/educationprocessor');
let personalInfoprocessor = require('.././sectionpersonalinfo/personalinfoprocessor');
let projectprocessor = require('.././sectionproject/projectprocessor');
let workProcessor = require('.././sectionworkexperiance/workprocessor');
let profileProcessor = require('.././profiles/profileprocessor');
/** 
 * API for returning questions pending to be answered by the 
    candidate for completion or updation of profile
 * Supports filtering for a given section of the profile, paginate the questions
 */
// HTTP GET /candidate/:candidateid/qboxquestions
// ?sections=[multiple values]&limit=&offset
// Effective url is /candidate/:candidateid/qboxquestions

router.get('/:candidateid/qboxquestions/', function(req, res) {
    // console.log('under get of ques');
    if (!req.params.candidateid) {
        throw new Error('Invalid request, requesting questions without candidate..!');
    }

    try {
        // sections=[multiple values] Eg: sections='skills,qualification,projects'
        let sections = req.query.sections ? req.query.sections.split(',') : [];
        let limit = req.query.limit ? req.query.limit : 3;
        let skip = req.query.skip ? req.query.skip : 0;
        let lang = req.query.lang ? req.query.lang : 'English';


        qboxProcessor.getQuestions(req.params.candidateid,
            sections,
            skip,
            limit,
            lang,
            function(colln) {
                console.log("In success callback about to do async call");
                async.map(colln,
                    function(question, cb) {
                        fieldQCache.getFieldQuestion(question.section, question.fieldname, lang,
                            function(err, query) {
                                let transformed = JSON.stringify(question);
                                transformed = JSON.parse(transformed);
                                query = query + question.instancename;
                                transformed.query = query;
                                transformed.lang = lang;
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
                // log the err
                res.status(500).json(err);
            });
    } catch (err) {
        // console.log('Unexpected error occurred in fetching qbox questions: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

/**
 *Api for returning final query object with combination of questions and fieldquestions
 */
// HTTP GET /candidate/:candidateid/qboxquestions/queries/
//     ?section=[multiple values]&limit=&skip&lang=
// Effective url is /candidate/:candidateid/qboxquestions/queries
router.get('/:candidateid/qboxquestions/queries', function(req, res) {
    if (!req.params.candidateid) {
        throw new Error('Invalid request, requesting questions without candidate..!');
    }

    try {
        let sections = req.query.sections ? req.query.sections.split(',') : [];
        let limit = req.query.limit ? req.query.limit : 3;
        let skip = req.query.skip ? req.query.skip : 0;
        let lang = req.query.lang ? req.query.lang : 'English';

        qboxProcessor.getQuestions(req.params.candidateid,
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
        //  console.log('Error occurred in fetching queryObject: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

/**
 * Route to tirgger inspecting of missing profile fields and add them to questionbox 
 */
router.post('/:candidateId/profile/missingfields', function(req, res) {
    try {
        profileProcessor.inspectMissingProfileFields(req.params.candidateId,
            function(result) {
                console.log("Result of findmissing ", result);
                res.json(result);
            },
            function(err) {
                return res.status(500).json({ error: err });
            });

    } catch (err) {
        console.log("error in missing field", err);
    }
})

// Effective url is /candidates/:candidateid
router.post('/:candidateId', function(req, res) {
    //  console.log('inside adding question req', req.body.section);

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
        //  console.log('Error occurred in adding project: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
}); // end post

// Effective url is /candidates/:candidateid
router.patch('/:candidateId/:answer', function(req, res) {
    try {
        qboxProcessor.updateQuestion(req.body, req.params.candidateId, req.params.answer,
            function(updatedQuestion) {
                profileProcessor.updateMissingFieldResponse(req.params.candidateId,
                    req.body.section, 
                    req.body.instancename,
                    req.body.fieldname,
                    req.params.answer,
                    function(err, result) {
                        if (err) {
                            return res.status(500).json(err);
                        }
                        return res.json(result);
                    });
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        //  console.log('Error occurred in updating question: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
}); // end post

module.exports = router;
