var coordinator = require('../coordinator/coordinatorschema');
var jwt = require('jsonwebtoken');


var authenticateCoordinator = function(email, clientToken, callback,
    unauthCB) {

    //@TODO Validate clientToken and authorize coordinator if clientToken is valid

    coordinator.findOne({
            coordinatorEmail: email
        },
        function(err, details) {
            if (err) {
               // console.error("Error in lookup for coordinator details ", err);
                callback(err, null);
                return;
            }

            if (!details) {
                unauthCB("Coordinator profile not found..!", null);
            }
           // console.log("From authenticateCoordinator", details);
            generateCoordinatorJWTToken(details, callback); //generate JWTToken
        });
};

var verifyCoordinatorJWTToken = function(token, clientToken, callback, unauthCB) {
    //@TODO verify clientToken

    var secretOrPrivateKey = getCoordinatorTokenSecret();

    jwt.verify(token, secretOrPrivateKey,
        function(err, payload) {
            if (err) {
               // console.error("Error in decoding token: ", err);
                unauthCB(err);
                return;
            }
            callback(payload);
        }
    ); //end of verify
}

var generateCoordinatorJWTToken = function(details, cb) {
    var payload = details;
    var secretOrPrivateKey = getCoordinatorTokenSecret();
    var options = {
        algorithm: "HS256",
        expiresIn: 36000,
        issuer: details.coordinatorId
    };

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
        if (err) {
            console.error("Error in generating token ", err);
        }
        cb(err, details, jwtToken);
    });
}

var getCoordinatorTokenSecret = function() {
    return 'SAMARTH-COORDINATOR-PLATFORM-SECRET';
}

module.exports = {
    "authenticateCoordinator": authenticateCoordinator,
    "isCoordinatorAuthenticated": verifyCoordinatorJWTToken
};
