let router = require('express').Router();
let centerdetailsprocessor = require('./centerdetailsprocessor');
let centerdetailsneoprocessor = require('./centerdetailsneoprocessor');
let authorization = require(../authorization/authorization);
let constants = require(../authorization/constants);


router.post('/',function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.ADMIN , constants.CREATE,constants.ADMIN);
},
function(req,res){

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
	router.get('/getall',
	function(req, res, next){
		authorization.isAuthorized(req, res, next,constants.ADMIN , constants.READ,constants.ADMIN);
	},
	function(req,res){

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
	router.post('/update/:regId',
	function(req, res, next){
		authorization.isAuthorized(req, res, next,constants.ADMIN , constants.EDIT,constants.ADMIN);
	}, function(req,res){
		centerdetailsprocessor.updateCenterdetails(req.params.regId, function(updatecenter){
			res.status(200).json(updatecenter);
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
