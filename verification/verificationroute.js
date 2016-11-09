let verification = require('./verificationmodel');
let router = require('express').Router();

let verificationprocessor = require('./verificationprocesser');

/* Effective url /verification/candidateid

 */
router.get('/:candidateid', function(req, res) {
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
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});
/* Effective url /verification/updateverification/typename
 */
router.patch('/updateverification/:typename', function(req, res) {
    try {
        verificationprocessor.updateverification(req.body, req.params.typename,
            function sucessCB(result) {
                res.status(200).send('OK');
            },
            function errorCB(error) {
                res.status(500).send(err);
            });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
