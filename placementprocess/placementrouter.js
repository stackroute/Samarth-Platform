const router = require('express').Router();
 const placementneo = require('./placementneoprocess.js');
const placementprocessor = require('./placementprocessor.js');

router.post('/',function(req,res){
	try
	{
    var jobdata =req.body;
		placementneo.applyJob(req.body,function(applied){
			//res.status(200).json(applied);
		},function(err){
			//res.status(500).send("server error... try it again!");
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

router.get('/appliedCandidates/:jobcode',function(req,res){
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

router.get('/appliedJobs/:candidateid',function(req,res){
	try
	{
		placementneo.appliedJobs(req,function(applied){
			res.status(200).send(applied);
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
