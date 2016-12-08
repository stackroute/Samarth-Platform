let router = require('express').Router();
let jobprovider = require('./jobproviderschema');
let jobproviderprocessor = require('./jobproviderprocessor');


router.post('/registeremployer', function(req, res) {
    try {
        let jobproviderdata = req.body;
        //  jobProfileProcessor.getjpCodeStatus(jobproviderdata.jpCode,
        //      function sucessCB(result) {
        //         let length = result.length;
        //         if (length > 0) {
        //             console.log(length)
        //         res.status(500).send('The Job Provider ID already exist. Please try with any other ID');
        // }
        jobprovider.findOne({jpCode:jobproviderdata.jpCode},
            function(err, result){
                if(err){
                    return res.send({error: "Something went wrong"});
                }
                if(result){
                    res.status(200).send('Please try with some other jobprovider Code');
                }else{
                    jobproviderprocessor.postjobprovider(jobproviderdata, function sucessCB(message) {
            res.status(200).send('OK');
        }, function errorCB(error) {
            res.status(500).send(error);
        });

                }
            });
        // else{

        //     jobproviderprocessor.postjobprovider(jobproviderdata, function sucessCB(message) {
        //     res.status(200).send('OK');
        // }, function errorCB(error) {
        //     res.status(500).send(error);
        // });

        
    // },function errorCB(error) {
    //             res.status(500).json(error);
    //         });
        
    } catch (err) {
        return res.status(500).send('Some error occured');
    }
});

module.exports = router;
 // coordinator.findOne({
 //            coordinatorId: req.body.mobile
 //        }, function(err, crdntrObj) {
 //            if (err) {
 //                return res.send({ error: 'Something went wrong, please report' });
 //            }

 //            if (crdntrObj) {
 //                // Already exists

 //            } 