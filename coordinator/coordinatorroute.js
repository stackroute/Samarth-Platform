var router = require('express').Router();
console.log("in route");
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
            }

        });
    } catch (err) {
        console.log("Error occurred in creating new coordinator : ", err);

    } //end c

});

module.exports = router;
