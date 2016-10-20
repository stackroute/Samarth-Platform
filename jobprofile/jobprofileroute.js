var router = require('express').Router();
var jobProfile = require('./jobProfileSchema');
var jobProfileProcessor = require('./jobprofileprocessor');

/*Effective url : /jobProfile/jobPost*/
router.post("/jobpost", function(req, res) {
    try {
        var jobData = req.body;
        console.log("Job data: " + JSON.stringify(jobData));
        jobProfileProcessor.getJobDetails(jobData.jobID, jobData.employer.employerID, function sucessCB(result) {
            var length = result.length;
            if (length > 0) {
                res.status(500).send("The job ID is already exist. Please try with any other ID");
            } else {
                jobProfileProcessor.postJob(jobData, function sucessCB(message) {
                    res.status(200).send("OK");
                }, function errorCB(error) {
                    res.status(500).send(error);
                });
            }
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
        console.log("Some other error" + err);
        return res.status(500).send("Some error occured");
    }
});

/*Effective url : /jobProfile/jobUpdate*/
router.patch("/jobupdate", function(req, res) {
    try {
        var jobData = req.body;
        console.log("Job data: " + JSON.stringify(jobData));
        jobProfileProcessor.updateJob(jobData, function sucessCB(result) {
            res.status(200).send("OK");
        }, function errorCB(error) {
            res.status(500).send(err);
        });
    } catch (err) {
        console.log("Some other error" + err);
        return res.status(500).send("Some error occured");
    }
});

/*Effective url : /jobProfile/getByJobID/:jobID*/
router.get("/getbyjobid/:jobID", function(req, res) {
    console.log("Hello inside get by id");
    try {
        jobProfileProcessor.getJobByID(req.params.jobID, function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).json(error);
        })
    } catch (err) {
        console.log("Error occurred in getting candidate object: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});

router.get("/getjobdetail/:jobID/:employerID", function(req, res) {
    console.log("Hello inside get job");
    try {
        jobProfileProcessor.getJobDetails(req.params.jobID, req.params.employerID, function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).send(error);
        });
    } catch (err) {
        console.log("Error occurred in getting details: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});
/*Effective url : /jobProfile/checkIDAvailable/:jobID/:companyName*/
router.get("/checkidavailable/:jobID/:employerID", function(req, res) {
    try {
        jobProfileProcessor.getJobDetails(req.params.jobID, req.params.employerID, function sucessCB(result) {
            var length = result.length;
            res.status(200).json(length);
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
        console.log("Error occurred in getting details: ", err);
        res.status(500).json({
            error: "Internal error occurred, please report"
        });
    }
});
module.exports = router;
