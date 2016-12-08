let router = require('express').Router();
let jobprovider = require('./jobproviderschema');
let jobproviderprocessor = require('./jobproviderprocessor');


router.post('/registeremployer', function(req, res) {
    try {
        let jobproviderdata = req.body;
        jobproviderprocessor.postjobprovider(jobproviderdata, function sucessCB(message) {
            res.status(200).send('OK');
        }, function errorCB(error) {
            res.status(500).send(error);
        });
    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

module.exports = router;
