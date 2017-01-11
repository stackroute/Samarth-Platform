let router = require('express').Router();
let workProcessor = require('./workprocessor');
let work = require('./workschema');
 

/* Get the types of work for the given candidate id*/
// HTTP GET /work/:candidateid
// effective url work/:candidateid
router.get('/:candidateid', function(req, res) {
	try{
	workProcessor.getworkexp(req.params.candidateid, function(workexps) {
		res.status(201).json(workexps);
	}, function(err) {
		res.status(500).json({ error: 'Internal error occurred' });
	});
}
catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
});

/* Add new types of work for the given candidate id only after registration*/
// HTTP POST /work/:candidateid
// effective url work/:candidateid
router.post('/:candidateid', function(req, res) {
	try{
	work.find({ candidateid: req.params.candidateid }, function(err, result) {
		if (result === '') {
			res.status(500).send('Register the Candidate before adding work experience ');
		} // end if
		else {
			workProcessor.addworkexp(req.body, req.params.candidateid, function() {

				res.status(201).json();
			}, function(err) {
				res.status(500).json({ error: 'can\'t add experiance in the records' });
			});
		}
	}); // end find
}
catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
}); // end post

/* update the types of work for the organisation with given candidate id
note:(pass every field from body) */

// HTTP PATCH /work/:candidateid/::organisation
// effective url work/:candidateid/::organisation
router.patch('/:candidateid/:workplace', function(req, res) {
try{
	work.find({ candidateid: req.params.candidateid }, function(err, result) {
		if (result === '') {
			res.status(500).send('Add the work experience with the candidate id before updating');
		} else {
					workProcessor.updateworkexp(req.body, req.params.candidateid, req.params.workplace,
					function(work1) {
						res.status(201).json(work1);
					},
					function(err) {
						res.status(500).json({ error: 'Internal error occurred' });
					});
			} // end try
			
		 // end else
	});
	}
	catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
	 // end find
}); // end patch
module.exports = router;
