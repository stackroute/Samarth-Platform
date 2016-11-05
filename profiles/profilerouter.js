let router = require('express').Router();
let profileprocessor = require('./profileprocessor');
let profile = require('./profileschema');

/* To get the profile collection of the given candidate id*/
// HTTP GET /profile/:candidateid /
// effective url /profile/:candidateid

router.get('/:candidateid', function(req, res) {
   // console.log('Inside get');
    try {
        profileprocessor.getprofile(req.params.candidateid,
            function(profileObj) {
                res.status(200).json(profileObj);
            },
            function(err) {
                res.status(500).json(err);
            }
        );
    } catch (err) {
      //  console.log('Error occurred in modifying old project: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

/* keep check on Adding Profile with existing candidate id*/
// HTTP POST /profile/:candidateid /
// effective url /profile/:candidateid

router.post('/:candidateid', function(req, res) {
    profile.find({ candidateid: req.params.candidateid }, function(error, profiles) {
        if(profiles) {
            res.status(500).send('Alert! Profile with Candidate id already exist ');
        }
        else{
            res.status(500).send('Register the candidate id  before posting');
        }
    });
});

/* Update profile section for the given candidate id NOTE:(Cant change candidate id)*/
// HTTP PATCH /profile/:candidateid /
// effective url /profile/:candidateid

router.patch('/:candidateid', function(req, res) {
   // console.log('Inside patch');
    profile.find({ candidateid: req.params.candidateid }, function(error, profiles) {
        if (profile === '') {
            res.status(500).send('profile doesnt exist for given candidate id');
        } else if (!req.body.candidateid) {
                try {
                    profileprocessor.modifyprofile(req.body, req.params.candidateid,
                        function(profileObj) {
                            res.status(200).json(profileObj);
                        },
                        function(err) {
                            res.status(400).json(err);
                        }
                    );
                } catch (err) {
                //  console.log('Error occurred in modifying profile: ', err);
                    res.status(500).json({
                        error: 'Internal error occurred, please report'
                    });
                }
            } // end if
            else
            {
                 res.status(500).send('Alert! Can\'t update Candidate id... ');
            } // end else
    });
});

module.exports = router;
    