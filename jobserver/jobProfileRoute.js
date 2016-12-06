var router = require('express').Router();
var jobProfile = require('./jobProfileSchema');
var jobProfileProcessor = require('./jobProfileProcessor');

//Routes defined

//post job
router.post('/jobpost',function(req,res){
	try{
			var jobData = req.body;
				jobProfileProcessor.addJob(jobData, function successFn(message){
				res.status(200).send('ok');
			},function errorFn(error){
				res.status(500).send(error);
			});
			} catch(err){
				return res.status(500).send('Some error occurred');
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