const router = require('express').Router();
const placementneo = require('./placementneoprocess.js');

router.post('/',function(req,res){
	try
	{
		placementneo.applyJob(req.body,function(applied){
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

router.get('/appliedCandidates/:jobname',function(req,res){
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