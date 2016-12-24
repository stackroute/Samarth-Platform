let router = require('express').Router();
let jobpreferencesProcessor = require('./jobpreferencesprocessor');
let preference = require('./jobpreferencesschema'); 
let jobpreferencesRelationBuilder = require('./jobpreferencesRelationBuilder');
   
/* get all project for the given candidate id */
// HTTP GET project/:candidateId
// effective url project/:candidateId
router.get('/:candidateId', function(req, res) {
    console.log("Enter");
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
    console.log("post");
    
    // console.log("---------->projectiiiii------->"+req.params.candidateId+"   "+req.body.projects[0].name);
    preference.find({ candidateid: req.params.candidateId }, function(err, result) {
        if (result == '') { 
            console.log("find");
/*            jobpreferencesProcessor.createNewPreferences(req.body,req.params.candidateId);
*/            res.status(500).send('Register the candidate first before adding a preferences');
        } // end if
        else {
           
            try { 
                console.log(":sdg");
                console.log(req.body);
                console.log(req.params.candidateId);
                /*jobpreferencesProcessor.createNewPreferences(req.body,req.params.candidateId);*/
                jobpreferencesProcessor.updatePreferences(req.body, req.params.candidateId,
                    function(preferenceObj) {
                        jobpreferencesRelationBuilder.jobpreferencesRelationBuilder(req.body.preferences,req.params.candidateId);
                        res.status(201).json(preferenceObj);
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

        } // end else
    }); // end find
});


router.patch('/:candidateId/:preferenceRole', function(req, res) {
    preference.find({ candidateid: req.params.candidateId }, function(err, result) {
        if (result === '') {
            res.status(500).send('Add Preferences with Candidate id before update');
        } else {
            try {
                jobpreferencesProcessor.updatePreferences(req.params.preferenceRole, req.body,
                    req.params.candidateId, function(preferenceObj) {
                        res.status(201).json(preferenceObj);
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
        }
    }); // end find
});

module.exports = router;
