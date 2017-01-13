let router = require('express').Router();
let centerdetailsprocessor = require('./centerdetailsprocessor');
let centerdetailsneoprocessor = require('./centerdetailsneoprocessor');

router.post('/', function(req,res){
	
	var center=req.body;


    centerdetailsprocessor.createNewcenterdetails(center,function(postdetails){
        console.log("Heloo " + postdetails.location);
            centerdetailsneoprocessor.createNodes(postdetails.location,postdetails.name,
                postdetails.centertype,function(err,success) {
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
    
})
router.get('/getall', function(req,res){
	 
    centerdetailsprocessor.getAllcenterdetails(function(getcenters){
            res.status(200).json(getcenters);
    },
    function(error){
            res.status(500).json(error);
    });
})
router.post('/:regId', function(req,res){
    var a = req.params.reg;
    centerdetailsprocessor.getCenterdetails(a,function(getcenter){
        res.status(200).json(getcenter);
    },
    function(error){
        res.status(500).json(error);
    });
})
router.post('/update/:regId', function(req,res){
    centerdetailsprocessor.updateCenterdetails(function(updatecenter){
            res.status(200).json(updatecenter);
    },
    function(error){
            res.status(500).json(error);
    });
})
module.exports = router;
