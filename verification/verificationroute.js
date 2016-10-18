var verification = require('./verificationmodel');
var router = require('express').Router();

var verificationprocessor = require('./verificationprocesser');

/* Effective url /verification/candidateid

 */
router.get("/:candidateid", function(req, res) {
    console.log("Inside get");
    try {
        verificationprocessor.getverification(req.params.candidateid,
            function(verificationdata) {
                res.status(200).json(verificationdata);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
        console.log("Error occurred in getting verification object: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});
router.patch("/updateverification", function(req, res) {
    try {
        var candidatedata = req.body;

        verificationprocessor.updateverification(candidatedata,
            function sucessCB(result) {
                res.status(200).send("OK");
            },
            function errorCB(error) {
                res.status(500).send(err);
            });
    } catch (err) {
        console.log("Some other error");
        return res.status(500).send("Some error occured");
    }
});

module.exports = router;
