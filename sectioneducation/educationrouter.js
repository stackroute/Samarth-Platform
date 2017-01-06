let router = require('express').Router();
let educationProcessor = require('./educationprocessor');
let eduModel = require('./educationschema');
/* Get Qualification details of the given candidate id*/
// HTTP GET education//:candidateid/
// effective url /education//:candidateid
router.get('/:candidateid', function(req, res) {
    try{
    educationProcessor.getEducation(req.params.candidateid, function(educationObject) {

         res.status(201).json(educationObject);
    }, function(err) {
        res.status(500).json({ error: 'Internal error occurred' });
    });
} catch (err) {
                res.status(500).json({ error: 'Internal error occurred, please report' });
            }


});

/* Add Qualification details of the given candidate id after registration*/
// HTTP Post education//:candidateid/
// effective url /education//:candidateid
router.post('/:candidateID', function(req, res) {
try {
    eduModel.find({ candidateid: req.params.candidateID }, function(err, result) {
        if (result === '') {
            res.status(500).send('Register Candidate with the given candidate id');
        } // end if
        else {
            
                educationProcessor.addEducation(req.body, req.params.candidateID,
                    function(updatedEdu,id) {
                         
                        res.status(201).json(updatedEdu);
                    },
                    function(err) {
                        res.status(500).json({ error: 'Internal error occurred, please report' });
                   
           
            }); 
        }
    });
    } catch (err) {
                res.status(500).json({ error: 'Internal error occurred, please report' });
            }
        
    });





     // find ends
 // post ends

/* Update Qualification details of the given candidate id by giving title in the parameter NOTE:
        (add evry field in the object while update)*/
// HTTP Patch education//:candidateid/:title
// effective url /education//:candidateid/:title
router.patch('/:candidateID/:title', function(req, res) {
    try {
    eduModel.find({ candidateid: req.params.candidateID }, function(err, result) {
      if (err || result === '') {
        res.status(500).send('Add Education collection with the given candidate id before Update');
        } else {

            
                educationProcessor.updateEducation(req.params.candidateID, req.params.title,
                                                        req.body,function(updatedEdu) {
                        res.status(201).json(updatedEdu);
                    },
                    function(err) {
                        res.status(500).send('updating new educational detail with invalid data ');
                    });
            } 
        });
    }
            catch (err) {
                res.status(500).json({ error: 'Internal error occurred, please report' });
            }
        
   });

module.exports = router;
