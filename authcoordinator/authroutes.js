var authByToken = require("./authbytoken");
var router = require('express').Router();

//Effective url /details/getcoordinator/
router.post('/getcoordinator/', function(req, res) {
    try {
        authByToken.authenticateCoordinator(req.body.email, req.body.ct,
            function(err, coordinatorDetails, token) {
                //Success callback
                if (err) {
                    console.log("Err in authenticating ", err);
                    return res.status(403).json(err);
                }

                console.log("from authroutes", coordinatorDetails);

                return res.json({
                    coordinator: coordinatorDetails,
                    token: token
                });
            },
            function(err) {
                //Unauthorized call back
                return res.status(403).json(err);
            });
    } catch (err) {
        console.error("Error occurred in authorizing coordinator ", err);
        return res.status(500).json({
            error: "Internal error in processing request, please retry later..!"
        });
    }
});

module.exports = router;
