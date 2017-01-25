let router = require('express').Router();
let galleryProcessor = require('./galleryprocessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');
let gallery = require('./galleryschema');
let config = require('../config/config');
 
router.get('/aws',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.GALLERY);
},function (req,res) {
    try {

        let awsConfig = new Object();
        awsConfig.region = config.REGION;
        awsConfig.secretAccessKey = config.SECRETACCESSKEY;
        awsConfig.accessKeyId = config.ACCESSKEYID;
        awsConfig.Bucket = config.BUCKET;
        res.json(awsConfig);
    } catch(e) {
        // statements
        console.log(e);
        res.status(500).json({
                    error: 'Error connecting to storage server!'
                });
    }
    /* body... */
}); //end of get /aws

router.get("/:candidateid", function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.GALLERY);
},
function(req, res) {
      try {
        galleryProcessor.getGallery(req.params.candidateid,
            function(candidateGallery) {
            // client.rpush('profilecrawling', req.params.candidateid);
            console.log('**************');
            console.log(candidateGallery);
                res.status(200).json(candidateGallery);
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

router.post('/:candidateid',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.GALLERY);
},function (req,res) {
    try{
        console.log("********data while adding!!!");
        // console.log(req.params);
        console.log(req.body);
	gallery.find({ candidateid: req.body.CANDIDATEID }, function(err, result) {
		if (result === '') {
			res.status(500).send('Register the Candidate before adding gallery contents ');
		} // end if
		else {
			galleryProcessor.addGallery(req.body, function(result) {

				res.status(201).json(result);
			}, function(err) {
				res.status(500).json({ error: 'can\'t add gallery in the records' });
			});
		}
	}); // end find
}
catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
   
}); //end of get /aws





/* Get the types of work for the given candidate id*/
// HTTP GET /work/:candidateid
// effective url work/:candidateid
// router.get('/:candidateid', function(req, res) {
// 	try{
// 	workProcessor.getworkexp(req.params.candidateid, function(workexps) {
// 		res.status(201).json(workexps);
// 	}, function(err) {
// 		res.status(500).json({ error: 'Internal error occurred' });
// 	});
// }
// catch (err) {
// 				res.status(500).json({
// 					error: 'Internal error occurred, please report'
// 				});
// 			}
// });

/* Add new types of work for the given candidate id only after registration*/
// HTTP POST /work/:candidateid
// effective url work/:candidateid
// router.post('/:candidateid',function(req, res) {
// 	try{
// 	work.find({ candidateid: req.params.candidateid }, function(err, result) {
// 		if (result === '') {
// 			res.status(500).send('Register the Candidate before adding gallery contents ');
// 		} // end if
// 		else {
// 			workProcessor.addworkexp(req.body, req.params.candidateid, function() {

// 				res.status(201).json();
// 			}, function(err) {
// 				res.status(500).json({ error: 'can\'t add gallery in the records' });
// 			});
// 		}
// 	}); // end find
// }
// catch (err) {
// 				res.status(500).json({
// 					error: 'Internal error occurred, please report'
// 				});
// 			}
// }); // end post

/* update the types of work for the organisation with given candidate id
note:(pass every field from body) */

// HTTP PATCH /work/:candidateid/::organisation
// effective url work/:candidateid/::organisation
// router.patch('/:candidateid/:workplace', function(req, res) {
// try{
// 	work.find({ candidateid: req.params.candidateid }, function(err, result) {
// 		if (result === '') {
// 			res.status(500).send('Add the work experience with the candidate id before updating');
// 		} else {
// 					workProcessor.updateworkexp(req.body, req.params.candidateid, req.params.workplace,
// 					function(work1) {
// 						res.status(201).json(work1);
// 					},
// 					function(err) {
// 						res.status(500).json({ error: 'Internal error occurred' });
// 					});
// 			} // end try
			
// 		 // end else
// 	});
// 	}
// 	catch (err) {
// 				res.status(500).json({
// 					error: 'Internal error occurred, please report'
// 				});
// 			}
// 	 // end find
// }); // end patch

// HTTP DELETE /work/:candidateid/:designation
//delete route for Work Experience deletion
// router.delete('/:candidateid/:designation', function(req, res) {
// 	try{
// 	work.find({ candidateid: req.params.candidateid }, function(err, result) {
// 		if (result === '') {
// 			res.status(500).send('Add the work experience with the candidate id before updating');
// 		} else {
// 				workProcessor.deleteworkexp(req.params.candidateid, req.params.designation,function() {
// 				res.status(201).json();
// 			}, function(err) {
// 				res.status(500).json({ error: 'can\'t delete experience from the records' });
// 			});
// 			} // end else
// 	}); //end find
// 	} //end try
// 			catch (err) {
// 				console.log("Error in ... ", err);
// 				res.status(500).json({
// 					error: 'Internal error occurred, please report'
// 				});
// 			} //end catch
// }); // end delete

module.exports = router;

