let router = require('express').Router();
let centerdetailsprocessor = require('./centerdetailsprocessor');
let centerdetailsneoprocessor = require('./centerdetailsneoprocessor');
let centerdetails = require('./centerdetailsschema');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');

router.post('/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.CREATE,constants.CENTERDETAILS);
},function(req,res){
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

                        console.log("in mongo");
                        console.log(postdetails);
                        var centerDomain = "centerDomain";
                            centerdetailsneoprocessor.createNodes(postdetails.centerLocation,centerDomain, postdetails.cname, postdetails.address, postdetails.centerCode,function(err,success) {
                            if (err) {
                                    console.log(err);
                                } else {
                                    console.log("NO ERR");
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
    // Centers in candidate registration form
router.get('/getPlacementCenter/:city',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.CENTERDETAILS);
}, function(req,res){
    centerdetailsneoprocessor.getPlacementCenter(req.city,function(getNeoCenter){
            res.status(200).json(getNeoCenter);
    },
    function(error){
            res.status(500).json(error);
    })
})


    // Center details card in candidate dashboard
router.get('/particularCenter/:candidateid', function(req, res, next) {
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ, constants.CENTERDETAILS);
},
 function(req,res){
    centerdetailsprocessor.getPersonalCenter(req.params.candidateid,function(getpersonalcenter){
        console.log("in router");
        // console.log(getpersonalcenter);
        // console.log(getpersonalcenter[0].placementCenter);
        // console.log(req.params.candidateid);
        var id = getpersonalcenter[0].placementCenter;
        console.log(id);
        // res.status(200).json(getpersonalcenter);
        centerdetailsprocessor.getPersonalCenterDetails(id,function(GetCenterDeatil){
            console.log("Get center details");
            console.log(GetCenterDeatil);
            res.status(200).json(GetCenterDeatil);
            })
    },
     function(error){
            res.status(500).json(error);
    }) 
})

    // Fetching all candidate details
router.get('/getall',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.CENTERDETAILS);
}, function(req,res){

    centerdetailsprocessor.getAllcenterdetails(function(getcenters){
            res.status(200).json(getcenters);
    },
    function(error){
            res.status(500).json(error);
    });
})
    // Editing center details by admin
router.post('/:regId',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.CREATE,constants.CENTERDETAILS);
}, function(req,res){
    var a = req.params.centerCode;
    centerdetailsprocessor.getCenterdetails(a,function(getcenter){
        res.status(200).json(getcenter);
    },
    function(error){
        res.status(500).json(error);
    });
})

    // Updating center details by admin
router.post('/update/:regId',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.CREATE,constants.CENTERDETAILS);
}, function(req,res){

    centerdetailsprocessor.updateCenterdetails(req.params.regId,req.body,function(updatecenter){
            res.status(200).json(updatecenter);
    },
    function(error){
            res.status(500).json(error);
    });
})
    // Disable center details by admin
router.post('/disable/:regId',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.CENTERDETAILS);
}, function(req,res){

    centerdetailsprocessor.disableCenterdetails(req.params.regId,req.body,function(updatecenterstatus){
            res.status(200).json(updatecenterstatus);
    },
    function(error){
            res.status(500).json(error);
    });
})
router.get('/getcenterdetails',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.READ,constants.CENTERDETAILS);
}, function(req, res) {
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
