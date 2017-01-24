const router = require('express').Router();
const placementneo = require('./placementneoprocess.js');
const placementprocessor = require('./placementprocessor.js');
var async = require('async');
var jobProfileProcessor = require('../jobServer/jobProfileProcessor');
let jobproviderprocessor = require('../jobprovider/jobproviderprocessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');


router.post('/apply/',
function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
     var jobdata =req.body;
		 placementneo.applyJob(req.body,function(applied){
		// 	//res.status(200).json(applied);
		 },function(err){
		// 	//res.status(500).send("server error... try it again!");
		 }),
	placementprocessor.applyjob(jobdata, function sucessCB(message) {
				res.status(200).json({
						msg: 'Applied Successfully!'
				});
		}, function errorCB(error) {
				res.status(500).send(error);
		});
	}
	catch(err)
	{
		console.log(err);
	}
})

router.post('/status/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
     var jobdata =req.body;
		 placementneo.status(req.body,function(applied){
				res.status(200).json(applied);
		 },function(err){
				res.status(500).send("server error... try it again!");
		 })
	}
	catch(err)
	{
		console.log(err);
	}
})


router.get('/offeredDetails/:candidateid',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		placementneo.acceptedDetails(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it candidateidain!");
			console.log(err);
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/acceptedCandidates/:jobcode',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		placementneo.acceptedCandidates(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it candidateidain!");
			console.log(err);
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/rejectedCandidates/:jobcode',function(req,res){
	try
	{
		placementneo.rejectedCandidates(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it candidateidain!");
			console.log(err);
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/joinedCandidates/:jobcode',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		placementneo.joinedCandidates(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it candidateidain!");
			console.log(err);
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/declinedCandidates/:jobcode',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		placementneo.declinedCandidates(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it candidateidain!");
			console.log(err);
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.post('/offer/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
    var jobdata =req.body;
		placementneo.accept(req.body,function(applied){
			//res.status(200).json(applied);
			console.log("accept api function is worked"+applied)
		},function(err){
			//res.status(500).send("server error... try it again!");
		})
	placementprocessor.offerjob(jobdata, function sucessCB(message) {
				res.status(200).json({
						msg: 'Applied Successfully!'
				});
		}, function errorCB(error) {
				res.status(500).send(error);
		});
	}
	catch(err)
	{
		console.log(err);
	}
})


router.post('/join/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
    var jobdata =req.body;
		placementneo.join(req.body,function(applied){
			res.status(200).json(applied);
			console.log("accept api function is worked"+applied)
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.post('/decline/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
    var jobdata =req.body;
		placementneo.decline(req.body,function(applied){
			res.status(200).json(applied);
			console.log("accept api function is worked"+applied)
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})



router.post('/reject/',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
    var jobdata =req.body;
		placementneo.reject(req.body,function(applied){
			//res.status(200).json(applied);
		},function(err){
			//res.status(500).send("server error... try it again!");
		})
	placementprocessor.rejectjob(jobdata, function sucessCB(message) {
				res.status(200).json({
						msg: 'Applied Successfully!'
				});
		}, function errorCB(error) {
				res.status(500).send(error);
		});
	}
	catch(err)
	{
		console.log(err);
	}
})


router.get('/appliedCandidates/:jobcode',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		placementneo.appliedCandidates(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})


router.get('/candidatesOfProfession/:profession',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.SEARCHCANDIDATE);
},
function(req,res){
	try
	{
		placementneo.candidatesOfProfession(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/availableCandidatesOfProfession/:profession',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.REPORTS);
},
function(req,res){
	try
	{
		placementneo.availableCandidatesOfProfession(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/candidatesAppliedProfession/:profession',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.REPORTS);
},
function(req,res){
	try
	{
		placementneo.candidatesAppliedProfession(req,function(applied){
			res.status(200).json(applied);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/candidatesPlacedProfession/:profession',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.REPORTS);
},
function(req,res){
	try
	{
		placementneo.candidatesPlacedProfession(req,function(placed){
			res.status(200).json(placed);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})

router.get('/appliedJobs/:candidateid',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.READ,constants.JOBPROVIDER);
},
function(req,res){
	try
	{
		var jobs=[];
  	var jobProfile={};
		placementneo.appliedJobs(req,function(applied){
			                async.forEachOf(applied, function(value, key, callback) {
                  // console.log('data',data.length);
                  // count = count + 1;
                  // console.log('count',count);
                  if(Object.keys(value).includes('jobs')) {
           jobProfileProcessor.getJobsbyJobId(value.jobs,function successFn(result) {
           // res.status(200).json(result);
            console.log(result.jobprovider);
            jobproviderprocessor.jobEdit(result[0].jobprovider, function sucessCB(results) {
            // res.status(200).send(result);
            jobProfile.logo=results[0].url;
            jobProfile.jb=result[0];
            // count = count + 1;
            // console.log('count',count);
            jobs.push(jobProfile);
            // console.log(jobProfile);
            jobProfile = {};
            callback();

        }, function errorCB(error) {
            res.status(500).json(error);
        });

         }, function errorFn(error) {
           res.status(500).send(error);
         });
        }
  },function(err) {
    // console.log(jobs);
    res.status(200).json(jobs);
  })
              // }
			// res.status(200).send(applied);
		},function(err){
			res.status(500).send("server error... try it again!");
		})
	}
	catch(err)
	{
		console.log(err);
	}
})


module.exports = router;
