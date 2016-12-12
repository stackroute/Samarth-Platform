let router = require('express').Router();
let jobprovider = require('./jobproviderschema');
let jobproviderprocessor = require('./jobproviderprocessor');


router.post('/registeremployer', function(req, res) {
    try {
        let jobproviderdata = req.body;
    
          jobproviderprocessor.postjobprovider(jobproviderdata, function sucessCB(message) {
            res.status(201).send('OK');
        }, function errorCB(error) {
            res.status(500).send(error);
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

router.get('/codeCheck/:jpCode', function(req, res) {
    try {
        var jpCode = req.params.jpCode;
        // console.log(jpCode);

        // jobproviderprocessor.getjpCodeStatus(jpCode, function sucessCB(result) {
        //     // if(result>=1){
        //         console.log(result);
        //         res.status(200).json({msg:"Success",count:result});
        //     // }else(result==0){
        //         // console.log(result);
        //         // res.status(200).json({msg:"Success",count:0});
            
            
        // }, function errorCB(error) {
        //     res.status(500).send(error);
        // });
        jobprovider.find({jpCode:jpCode}).count(function(err,count){
            if(err){
                return res.status(500).send("something went wrong");
            }if(count>=1){
                return res.status(200).json({msg:"Fail",count:count});
            }
            else return res.status(200).json({msg:"Success",count:0});
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

module.exports = router;
 