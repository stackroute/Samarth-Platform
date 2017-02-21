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


// --------------delete the image data from mongo---------------
router.delete('/:candidateid/:imageTitle', function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.DELETE,constants.WORKEXPERIENCE);
},
function(req, res) {
    try{
    gallery.find({ candidateid: req.params.candidateid }, function(err, result) {
        if (result === '') {
            res.status(500).send('Add the image with the candidate id before deleting');
        } else {
                galleryProcessor.deleteImage(req.params.candidateid, req.params.imageTitle,function() {
                res.status(201).json();
            }, function(err) {
                res.status(500).json({ error: 'can\'t delete image from the records' });
            });
            } // end else
    }); //end find
    } //end try
            catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            } //end catch
}); // end delete






module.exports = router;

