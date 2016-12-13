var router = require('express').Router();
var jobProfile = require('./jobProfileSchema');
var jobProfileProcessor = require('./jobProfileProcessor');

//Routes defined

//post job
router.post('/jobpost',function(req,res){
	try{
			var jobData = req.body;
			jobProfileProcessor.getJobDetails(jobData.jpCode, jobData.desc.title,
             function successFn(result) {
                console.log("result length "+result.length);
                if (result.length > 0) {
                	console.log("in if route");
                	   res.status(200).json({status:'failed',msg:'Job with this title is already posted by you! try with some other title'});
                }else{
						        console.log("else job route");
						         jobProfileProcessor.addJob(jobData, function successFn(message){
										 res.status(200).json({status:'success',msg:'Job posted successfully!'});
			},function errorFn(error){
				res.status(200).json({status:'failed',error:'Some error occurred'});
					})
	     	}  
	   },function errorFn(error) {
                res.status(500).json({status:'failed',error:'Some error occurred'});
            });
			} catch(err){
				return res.status(500).send("Some error occurred");
			}
});

//get jobs
router.get('/getjobs', function(req, res) {
    try {
        jobProfileProcessor.getJobs(function successFn(result) {
            res.status(200).send(result);
        }, function errorFn(error) {
            res.status(500).send(error);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal error occured, please report' });
    }
});

module.exports = router ;