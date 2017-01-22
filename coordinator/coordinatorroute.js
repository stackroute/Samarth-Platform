let router = require('express').Router();
let coordinatorprocessor = require('./coordinatorprocessor');
let coordinator = require('./coordinatorschema');
let circleProcessor = require('../circlesBackEnd/circleProcessor');
let circleNeo4jProcessor = require('../circlesBackEnd/circleNeo4jProcessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');

router.get('/getcoordi', function(req, res, next){
	authorization.isAuthorized(req, res, next,constants.ADMIN , constants.READ,constants.ADMIN);
},function(req,res){

    coordinatorprocessor.getcoordinator(function(getcoordinator){
                res.status(200).json(getcoordinator);
    },
    function(error){
            res.status(500).json(error);
    });
})

router.post('/createcoordinator', function(req, res, next){
   authorization.isAuthorized(req, res, next, req.user._doc.userRole[0], constants.CREATE, constants.ADMIN);
   },function(req, res) {
    try {
        coordinator.findOne({
            coordinatorId: req.body.mobile
        }, function(err, crdntrObj) {
            if (err) {
                return res.send({ error: 'Something went wrong, please report' });
            }

            if (crdntrObj) {
                return res.status(500).json({ error: 'User already exists'});

            } else {
                // Does not exists
                coordinatorprocessor.createCoordinator(req.body,
                    function(coordinatorObj) {
                        return coordinatorObj;
                    },
                    function(err) {
                        return err;
                    });
                  }
                circleProcessor.createRelation(req.body, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    return res.status(200).json({Success : 'successfully Registered'});

                });
            }
        );
    } catch (err) {
        console.log('Error occurred in creating new coordinator : ', err);
    } // end c
});

module.exports = router;
