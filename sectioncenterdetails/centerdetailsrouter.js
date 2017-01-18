let router = require('express').Router();
let centerdetailsprocessor = require('./centerdetailsprocessor');
let centerdetailsneoprocessor = require('./centerdetailsneoprocessor');
let centerdetails = require('./centerdetailsschema');
let authorization = require(../authorization/authorization);
let constants = require(../authorization/constants);


router.post('/',function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.ADMIN , constants.CREATE,constants.ADMIN);
},
function(req,res){
	var center=req.body;

   try {
        centerdetails.findOne({
            centerCode: req.body.centerCode
        }, function(err, centerObj) {
            if (err) {
                return res.send({ error: 'Something went wrong, please report' });
            }
            if (centerObj) {
                return res.status(500).json({ error: 'Center code already exists'});

            } else {
                // Does not exists
                 centerdetailsprocessor.createNewcenterdetails(center,function(postdetails){
                        console.log("Heloo " + postdetails.location);
                            centerdetailsneoprocessor.createNodes(postdetails.location,postdetails.cname,
                                postdetails.centerCode,function(err,success) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Varun");
                                }
                            });
                            res.status(200).json(postdetails);
                    },
                    function(error){
                            res.status(500).json(error);
                    });
                  }
            }
        );
    } catch (err) {
        console.log('Error occurred in creating new center : ', err);
    } // end c

})
router.get('/getall', function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.ADMIN , constants.READ,constants.ADMIN);
}, function(req,res){

    centerdetailsprocessor.getAllcenterdetails(function(getcenters){
            res.status(200).json(getcenters);
    },
    function(error){
            res.status(500).json(error);
    });
})
router.post('/:regId', function(req,res){
    var a = req.params.centerCode;
    centerdetailsprocessor.getCenterdetails(a,function(getcenter){
        res.status(200).json(getcenter);
    },
    function(error){
        res.status(500).json(error);
    });
})
router.post('/update/:regId', function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.ADMIN , constants.EDIT,constants.ADMIN);
}, function(req,res){

    centerdetailsprocessor.updateCenterdetails(req.params.regId,req.body,function(updatecenter){
            res.status(200).json(updatecenter);
    },


		function(error){
			res.status(500).json(error);
		});
	})

router.post('/disable/:regId', function(req,res){

    centerdetailsprocessor.disableCenterdetails(req.params.regId,req.body,function(updatecenterstatus){
            console.log(updatecenterstatus);
            console.log(req.params.regId);
            console.log(req.body);
            res.status(200).json(updatecenterstatus);
    },

    function(error){
            res.status(500).json(error);
    });
})

router.get('/getcenterdetails', function(req, res) {
    try {
        centerdetailsprocessor.getcenterdetails(function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

	module.exports = router;
