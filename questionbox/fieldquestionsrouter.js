var router = require('express').Router();
var fieldquestions = require('./fieldquestions');
var fieldQProcessor = require('./fieldQProcessor');
var redis = require('redis');
var client = redis.createClient();
console.log("client created");

/**
 * Api for returning field question query statement, for asking the candidate to answer or fill the pending field of profile data
 * can filter these query statements for a perticular section with and fieldnames (multiple) and language
 */
// HTTP GET /fieldquestions/:section/
//     ?fieldname=[multiple values]&lang=[multiple values]
// Effective url is /fieldquestions/:section
router.get("/:section", function(req, res) {
    if (!req.params.section) {
        throw new Error("Invalid request, requesting field question query without mentioning profile section..!");
    }

    try {
        var fieldNames = (req.query.fieldname) ? req.query.fieldname.split(",") : [];
        var lang = (req.query.lang) ? req.query.lang.split(",") : [];
        var obj = [];
        var querykey = req.params.section + fieldNames + lang;
        var question = fieldQProcessor.getFieldQuestions(req.params.section,
            fieldNames,
            lang,
            function(question) {
                return res.status(200).json(question);
            },
            function(querydata) {
                for (var key = 0; key < querydata.length; key++) {
                    obj.push(querydata[key].query);
                }
                client.hmset("qBoxQuery", querykey, obj);

            },
            function(err) {
                return res.status(500).json(err);
            });
    } catch (err) {
        console.log("Error occurred in fetching questions: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

// Effective url is /fieldquestions/
router.post("/", function(req, res) {
    try {
        fieldQProcessor.createFieldQuestion(req.body,
            function(createdObj) {
                res.status(201).json(createdObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Unexpected error ocurred during field questions post: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }

}); //end post


module.exports = router;
