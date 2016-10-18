var verification = require('./verificationmodel');
var router = require('express').Router();

var verificationprocessor = require('./verificationprocesser');

/* Effective url /verification/candidateid

 */
router.get("/:candidateid", function(req, res) {

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
/* Effective url /verification/updateverification
 */
router.patch("/updateverification", function(req, res) {
    try {

        // var candidatedata = req.body;
        // console.log("in patch", candidatedata);


        verificationprocessor.updateverification(req.body,
            function sucessCB(result) {
                res.status(200).send("OK");
            },
            function errorCB(error) {
                console.log('errorCB');
                res.status(500).send(err);
            });
    } catch (err) {

        console.log("Some other error", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
