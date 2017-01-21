let router = require('express').Router();
let personalInfoProcessor = require('./personalinfoprocessor');
let persons = require('./personalinfoschema');
let personNeo = require('./personalinfoneoprocessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');

/* update personal info only after registration of candidate*/
// HTTP POST personalinfo/:candidateid
// effective url personalinfo/:candidateid/
router.post('/:candidateid',function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.CANDIDATE , constants.EDIT,constants.CANDIDATE);
}, function(req, res) {
try {
    persons.find({ candidateid: req.params.candidateid }, function(err, result) {
        if (result === '') {
            res.status(500).send('Register candidates before updating personal info');
        } // end if
        else if (!req.body.candidateid) {

                    personalInfoProcessor.updatePersonalinfo(req.body, req.params.candidateid,
                        function(personalinfo) {
                            personNeo.createLanguageNode(req.body.personalInfo, req.params.candidateid);

                            res.status(201).json(personalinfo);
                        },
                        function(err) {
                            res.status(500).json({ error: 'Internal error occurred, please report' });
                        });
                }
             // end if inside else
            else {
                res.status(500).send('Alert !!! Cant update the Candidate id');
            }
            });
        }
            catch (err) {
                    res.status(500).json({ error: 'Internal error occurred, please report' });
                }

}); // end post
/* get personal info of the candidate id*/
// HTTP GET personalinfo/:candidateid
// effective url personalinfo/:candidateid/
router.get('/:candidateid',function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.CANDIDATE , constants.READ,constants.CANDIDATE);
},  function(req, res) {
try{
    personalInfoProcessor.getPersonalinfo(req.params.candidateid,
        function(getperson) {
           // personNeo.getbyLanguage(req.params.candidateid, req);
            res.status(201).json(getperson);
        },
        function(err) {
            res.status(500).json({ error: 'Internal error occurred' });
        });
}
 catch (err) {
                    res.status(500).json({ error: 'Internal error occurred, please report' });
                }
});
//Getting already uploaded profile image
router.get('/:candidateid/profilepic', function(req, res) {
    try{
    personalInfoProcessor.getProfilePic(req.params.candidateid,
        function(getperson) {
            res.status(200).json(getperson);
        },
        function(err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error occurred' });
        });
}
 catch (err) {
                    res.status(500).json({ error: 'Internal error occurred, please report' });
                }
});
//Updating new profile image
router.post('/:candidateid/profilepic', function(req, res) {
    try {
    persons.find({ candidateid: req.params.candidateid }, function(err, result) {
        if (result.length == 0) {
            res.status(500).send('Register candidates before updating personal info');
        } // end if
        else if (!req.body.candidateid) {

                    personalInfoProcessor.updateProfilePic(req.body, req.params.candidateid,
                        function(profilepic) {
                            res.status(201).json(profilepic);
                        },
                        function(err) {
                            console.log(err)
                            res.status(500).json({ error: 'Internal error occurred, please report' });
                        });
                }
             // end if inside else
            else {
                res.status(500).send('Alert !!! Cant update the Candidate id');
            }
            });
        }
    catch (err) {
                    console.log(err);
                    res.status(500).json({ error: 'Internal error occurred, please report' });
                }
}); // end post
module.exports = router;
