let router = require('express').Router();
let jobprovider = require('./jobproviderschema');
let jobproviderprocessor = require('./jobproviderprocessor');
const jobproviderneoprocessor = require('./jobproviderNeoProcessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');


router.post('/registeremployer',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.COORDINATOR);
}, function(req, res) {
    try {
        let jobproviderdata = req.body;

        jobproviderneoprocessor.registerJobProvider(jobproviderdata,function(result){

        },function(err){

        });

        jobproviderprocessor.getjpCodeStatus(jobproviderdata.jpCode,
            function sucessCB(result) {
                if (result.length > 0) {
                    res.status(200).json({
                        msg: 'JobProvider with this code already present! Please try some other code...'
                    });
                } else {
                    jobproviderprocessor.postjobprovider(jobproviderdata, function sucessCB(message) {
                        res.status(200).json({
                            msg: 'Registered Successfully!'
                        });
                    }, function errorCB(error) {
                        res.status(500).send(error);
                    });
                }
            },
            function errorCB(error) {
                res.status(500).json({
                    status: 'failed',
                    error: 'Some error occurred'
                });
            });

    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

router.get('/codeCheck/:jpCode', function(req, res) {
    try {
        var jpCode = req.params.jpCode;
        jobprovider.find({
            jpCode: jpCode
        }).count(function(err, count) {
            if (err) {
                return res.status(500).send("something went wrong");
            }
            if (count >= 1) {
                return res.status(200).json({
                    msg: "Fail",
                    count: count
                });
            } else return res.status(200).json({
                msg: "Success",
                count: 0
            });
        });
    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

router.get('/getJobProvider', function(req, res) {
    try {
        jobproviderprocessor.getjobproviders(function sucessCB(result) {
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




router.patch('/jobupdate',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0], constants.EDIT,constants.COORDINATOR);
}, function(req, res) {
    try {
        let jobData = req.body;
        jobproviderprocessor.updateJob(jobData, function sucessCB(result) {
            res.status(200).send('OK');
        }, function errorCB(error) {
            res.status(500).send(err);
        });
    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

router.get('/getJobProviderbyid/:jpCode', function(req, res) {
    try {
        var jpCode = req.params.jpCode;
        jobproviderprocessor.jobEdit(jpCode, function sucessCB(result) {
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
