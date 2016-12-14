let router = require('express').Router();
let coordinatorprocessor = require('./coordinatorprocessor');
let coordinator = require('./coordinatorschema');
let circleProcessor = require('../circlesBackEnd/circleProcessor');
let circleNeo4jProcessor = require('../circlesBackEnd/circleNeo4jProcessor');


router.post('/createcoordinator', function(req, res) {
    // console.log(req.body)
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
                      // circleNeo4jProcessor.creacteNode( req.body,function(err, res) {
                      //     if (err) {
                      //       console.log(err);
                      //     } else {
                      //         console.log(res);
                      //     }
                      // });
                        return coordinatorObj;
                        // circleNeo4jProcessor.creacteNode( function(err, res) {
                        //     if (err) {
                        //       console.log(err);
                        //     } else {
                        //         console.log(stat);
                        //     }
                        // });
                    },
                    function(err) {
                        return err;
                    });
                  }

                // for nepo4j rellation
                //
                // let circle = {
                //     name: req.body.profession,
                //     domain: 'profession',
                //     circleType: 'Profiling',
                //     visuality: 'shared'
                // };

                //
                // circleProcessor.circlePost(circle,
                //     function errorCB(err) {
                //         if (err) {
                //
                //             return res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
                //         }
                //     });
                circleProcessor.createRelation(req.body, function(err) {
                    if (err) {
                        console.log(err);
                    }

                });

                coordinatorprocessor.insertCoordinator(req.body,
                    function(err, user) {
                        if (err) {
                            // return res.status(500).json({
                            error: 'Internal error in processing request, please retry later..!';
                        }

                        return res.status(200).json(user);
                    },
                    function(err) {
                        return res.status(403).json(err);
                    }); // insertCoordinator ends
            }
        );
    } catch (err) {
        console.log('Error occurred in creating new coordinator : ', err);
    } // end c
});

module.exports = router;
