let router = require('express').Router();
let jobProfile = require('./jobprofileschema');
let jobProfileProcessor = require('./jobprofileprocessor');
let jobProfileNeo = require('./jobprofileneoprocessor');
/* Effective url : /jobProfile/jobPost*/
router.post('/jobpost', function(req, res) {
    try {
        let jobData = req.body;
        jobProfileProcessor.getJobDetails(jobData.jobID, jobData.employer.employerID,
             function sucessCB(result) {
                let length = result.length;
                if (length > 0) {
                    res.status(500).send('The job ID is already exist. Please try with any other ID');
                } else {
                    jobProfileNeo.createEmployerNode(jobData, function(err, stat) {
                        if (err) {
                          console.log(err);
                        } else {
                            console.log(stat);
                        }
                    });
                    jobProfileProcessor.postJob(jobData, function sucessCB(message) {
                        res.status(200).send('OK');
                    }, function errorCB(error) {
                        res.status(500).send(error);
                    });
                }
            },
            function errorCB(error) {
                res.status(500).json(error);
            });
    } catch (err) {
        return res.status(500).send(err);
    }
});

/* Effective url : /jobProfile/jobUpdate*/
router.patch('/jobupdate', function(req, res) {
    try {
        let jobData = req.body;
        jobProfileProcessor.updateJob(jobData, function sucessCB(result) {
            res.status(200).send('OK');
        }, function errorCB(error) {
            res.status(500).send(err);
        });
    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

/* Effective url : /jobProfile/getByJobID/:jobID*/
router.get('/getbyjobid/:jobID', function(req, res) {
    try {
        jobProfileProcessor.getJobByID(req.params.jobID, function sucessCB(result) {
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

router.get('/getjobs', function(req, res) {
    try {
        jobProfileProcessor.getJobs(function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).send(error);
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal error occured, please report' });
    }
});

router.get('/getjobdetail/:jobID/:employerID', function(req, res)
    try {
        jobProfileProcessor.getJobDetails(req.params.jobID, req.params.employerID,
         function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).send(error);
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});
/* Effective url : /jobProfile/checkIDAvailable/:jobID/:companyName*/
router.get('/checkidavailable/:jobID/:employerID', function(req, res) {
    try {
        jobProfileProcessor.getJobDetails(req.params.jobID, req.params.employerID,
            function sucessCB(result) {
            let length = result.length;
            res.status(200).json(length);
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) 
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});
module.exports = router;
