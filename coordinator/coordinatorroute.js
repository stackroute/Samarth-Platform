let router = require('express').Router();
let coordinatorprocessor = require('./coordinatorprocessor');

let coordinatorneoprocessor = require('./coordinatorneoprocessor');
let coordinator = require('./coordinatorschema');
let circleProcessor = require('../circlesBackEnd/circleProcessor');
let circleNeo4jProcessor = require('../circlesBackEnd/circleNeo4jProcessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');

router.get('/profession', function(req, res)
{
    try
    {
        coordinatorneoprocessor.getProfessions(function(professions)
        {
            res.status(200).json(professions);
        }, function(err)
        {
            res.status(500).json(err);
        });
    } catch (err)

    {

        res.status(500).json(
        {
            error: 'Server error...try again later'
        });
    }
});


router.get('/role', function(req, res)
{
    try
    {
        coordinatorneoprocessor.getRole(function(role)
        {
            res.status(200).json(role);
        }, function(err)
        {
            res.status(500).json(err);
        });
    } catch (err)

    {

        res.status(500).json(
        {
            error: 'Server error...try again later'
        });
    }
});


router.get('/language', function(req, res)
{
    try
    {
        coordinatorneoprocessor.getLanguage(function(language)
        {
            res.status(200).json(language);
        }, function(err)
        {
            res.status(500).json(err);
        });
    } catch (err)

    {

        res.status(500).json(
        {
            error: 'Server error...try again later'
        });
    }
});


router.get('/location', function(req, res)
{
    try
    {
        coordinatorneoprocessor.getLocation(function(location)
        {
            res.status(200).json(location);
        }, function(err)
        {
            res.status(500).json(err);
        });
    } catch (err)

    {

        res.status(500).json(
        {
            error: 'Server error...try again later'
        });
    }
});

router.get('/getcoordi', function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.READ,constants.ADMINS);
},function(req,res){

    coordinatorprocessor.getcoordinator(function(getcoordinator){
                res.status(200).json(getcoordinator);
    },
    function(error){
            res.status(500).json(error);
    });
})

router.get('/getcoordinator/:coordinatorId', function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0]  , constants.READ,constants.ADMINS);
},function(req,res){

    coordinatorprocessor.getcoordinatordetails(req.params.coordinatorId,function(getcoordinator){
                res.status(200).json(getcoordinator);
    },
    function(error){
            res.status(500).json(error);
    });
})

router.post('/createcoordinator', function(req, res, next){
   authorization.isAuthorized(req, res, next, req.user._doc.userRole[0], constants.CREATE, constants.ADMINS);
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

                // for nepo4j relation
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


                         coordinatorneoprocessor.getcoordiplace(req.body.placementCenter,
                         req.body.mobile,function(err){


                        });
                            //res.status(200).json(getNeoCenter);

                circleProcessor.createRelation(req.body, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    return res.status(200).json({Success : 'successfully Registered'});

                });



                 // coordinatorprocessor.createCoordinator(req.body,
                 //    function(coordinatorObj) {
                 //         coordinatorneoprocessor.getcoordiplace(req.body.placementCenter,
                 //         req.body.mobile,function(getNeoCenter){

                 //            console.log(getNeoCenter);
                 //            //res.status(200).json(getNeoCenter);
                 //         },
                 //             function(error){
                 //        // res.status(500).json(error);
                 //             })
                 //     });








                // coordinatorprocessor.insertCoordinator(req.body,
                //     function(err, user) {
                //         if (err) {
                //             // return res.status(500).json({
                //             error: 'Internal error in processing request, please retry later..!';
                //         }

                //         return res.status(200).json(user);
                //     },
                //     function(err) {
                //         return res.status(403).json(err);
                //     }); // insertCoordinator ends
            }
        );
    } catch (err) {
        console.log('Error occurred in creating new coordinator : ', err);
    } // end c
});

router.patch('/updatecoordinator/:coordinatorId', function(req, res) {
    
    try {
        coordinator.find({
            coordinatorId: req.params.coordinatorId
        }, function(err, crdntrObj) {
            if (err) {
                return res.send({ error: 'Something went wrong, please report' });
            }

            if (crdntrObj) {
                coordinatorprocessor.updateCoordinator(req.body,
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
            } else {
                // Does not exists
                return res.status(500).json({ error: 'No details found with the given details to update'});
            }

                // for nepo4j relation
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
                    return res.status(200).json({Success : 'successfully Registered'});

                });
            }
        );
    } catch (err) {
        console.log('Error occurred in creating new coordinator : ', err);
    } // end c
});

module.exports = router;
