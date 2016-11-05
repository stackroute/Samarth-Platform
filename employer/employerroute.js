let router = require('express').Router();
let employer = require('./employerschema');
let employerProcessor = require('./employerproccessor');

router.post('/registeremployer', function(req, res) {
    try {
        let employerData = req.body;
        // console.log("Employer data: " + JSON.stringify(employerData));
        employerProcessor.getEmployerByID(employerData.employerID, function sucessCB(result) {
            let length = result.length;
            if (length > 0) {
                res.status(500).send('The employer ID is already exist. Please try with any other ID');
            } else {
                employerProcessor.postEmployer(employerData, function sucessCB(message) {
                    res.status(200).send('OK');
                }, function errorCB(error) {
                    res.status(500).send(error);
                });
            }
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
        // console.log("Some other error" + err);
        return res.status(500).send('Some error occured');
    }
});

router.get('/getbyemployerid/:employerId', function(req, res) {
    // console.log("Hello inside get by id" + req.params.employerId);
    try {
        employerProcessor.getEmployerByID(req.params.employerId, function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
        //  console.log("Error occurred in getting employer object: ", err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

router.get('/getemployers', function(req, res) {
    try {
        employerProcessor.getEmployers(function sucessCB(result) {
            res.status(200).send(result);
        }, function errorCB(error) {
            res.status(500).json(error);
        });
    } catch (err) {
      //  console.log('Error occurred in getting employers: ', err);
        res.status(500).json({
            error: 'Internal error occurred, please report'
        });
    }
});

module.exports = router;
