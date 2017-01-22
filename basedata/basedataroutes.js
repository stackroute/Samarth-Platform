let router = require('express').Router();
let baseDataProcessor = require('./basedataprocessor');

// Effective url /basedata/sidenavdata to insert sidenav contents into mongodb
router.post('/sidenavdata',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0], constants.CREATE,constants.COORDINATOR);
}, function(req, res) {
    try {
        //console.log("data in side nav", req.body.sidenavcontents[0]);


        baseDataProcessor.insertSidenavContents(req.body.sidenavcontents,
            function(err, contents) {

                if (err) {

                    //console.log("error -->",err );
                    return res.status(500).json({
                        error: 'Internal error in processing request, please retry later..!'
                    });
                }

                return res.status(200).json(contents);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        // console.error('Error in loading contents ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
}); // end of sidenavdata

router.post('/rubricdata', function(req, res) {
    try {
        baseDataProcessor.insertRubricContents(req.body,
            function(err, contents) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal error in processing request, please retry later..!'
                    });
                }

                return res.status(200).json(contents);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        // console.error('Error in loading contents ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
}); // end of rubricdata

router.post('/coordinatordata', function(req, res) {
    try {
        baseDataProcessor.insertCoordinatorContents(req.body,
            function(err, contents) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal error in processing request, please retry later..!'
                    });
                }

                return res.status(200).json(contents);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        // console.error('Error in loading contents ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
}); // end of coordinatordata

router.post('/coordinatoruserdata', function(req, res) {
    try {
        baseDataProcessor.insertCoordinatorUserContents(req.body,
            function(err, contents) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal error in processing request, please retry later..!'
                    });
                }

                return res.status(200).json(contents);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        // console.error('Error in loading contents ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
}); // end of coordinatoruserdata

router.post('/circledata', function(req, res) {
    try {
        baseDataProcessor.insertCircleContents(req.body,
            function(err, contents) {
                if (err) {
                    return res.status(500).json({
                        error: 'Internal error in processing request, please retry later..!'
                    });
                }

                return res.status(200).json(contents);
            },
            function(err) {
                return res.status(403).json(err);
            });
    } catch (err) {
        // console.error('Error in loading contents ', err);
        return res.status(500).json({
            error: 'Internal error in processing request, please retry later..!'
        });
    }
}); // end of circledata

module.exports = router;
