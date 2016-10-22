var router = require('express').Router();
var coordinatorprocessor = require('./coordinatorprocessor');
var coordinator = require('./coordinatorschema');
router.post('/createcoordinator', function(req, res) {
    console.log("inside post request", req.body.mobile);
    try {

        coordinator.find({
            "coordinatorId": req.body.mobile
        }, function(error, coordinatorid) {
            // console.log("********************************", req.body.mobile);
            if (coordinatorid == "") {

                coordinatorprocessor.createCoordinator(req.body,
                    function(coordinatorObj) {

                        return coordinatorObj;
                    },
                    function(err) {
                        return err;
                    });
                coordinatorprocessor.insertCoordinator(req.body,
                    function(err, user) {
                        if (err) {
                            return res.status(500).json({
                                error: "Internal error in processing request, please retry later..!"
                            });
                        }

                        return res.status(200).json(user);
                    },
                    function(err) {
                        return res.status(403).json(err);
                    }); //insertCoordinator ends
            }

        });
    } catch (err) {
        console.log("Error occurred in creating new coordinator : ", err);

    } //end c

});

module.exports = router;
