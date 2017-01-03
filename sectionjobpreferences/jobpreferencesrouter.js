let router = require('express').Router();
let jobpreferencesProcessor = require('./jobpreferencesprocessor');
let preference = require('./jobpreferencesschema'); 
let jobpreferencesRelationBuilder = require('./jobpreferencesRelationBuilder');

router.get('/:candidateId', function(req, res) {
    try {  
        let preferenceObj = jobpreferencesProcessor.getPreferences(req.params.candidateId,
            function(preferenceObj) {
                res.status(200).json(preferenceObj);
            },
            function(err) {
                res.status(500).json(err);
            });
    } catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});  
 


router.post('/:candidateId', function(req, res) {
    try { 
        preference.find({ candidateid: req.params.candidateId }, function(err, result) {
            if (result == '') { 
                res.status(500).send('Register the candidate first before adding a preferences');
        } // end if
        else {
            /*jobpreferencesProcessor.createNewPreferences(req.body,req.params.candidateId);*/
            jobpreferencesProcessor.updatePreferences(req.body, req.params.candidateId,
                function(preferenceObj) {
                    jobpreferencesRelationBuilder.jobpreferencesRelationBuilder(req.body.preferences,req.params.candidateId);
                    res.status(201).json(preferenceObj);
                },
                function(err) {
                    res.status(500).json(err);
                });
        } 
    });
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
 }); // end find



router.patch('/:candidateId/:preferenceRole', function(req, res) {
    try {
        preference.find({ candidateid: req.params.candidateId }, function(err, result) {
            if (result === '') {
                res.status(500).send('Add Preferences with Candidate id before update');
            } else {
                jobpreferencesProcessor.updatePreferences(req.params.preferenceRole, req.body,
                    req.params.candidateId, function(preferenceObj) {
                        res.status(201).json(preferenceObj);
                    },
                    function(err) {
                        res.status(500).json(err);
                    });
            } 
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
}); // end find

module.exports = router;
