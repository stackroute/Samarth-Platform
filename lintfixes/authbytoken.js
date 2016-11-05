let coordinator = require('../coordinator/coordinatorschema');
let jwt = require('jsonwebtoken');


let authenticateCoordinator = function(email, clientToken, callback,
    unauthCB) {
    // @TODO Validate clientToken and authorize coordinator if clientToken is valid

    coordinator.findOne({
            coordinatorEmail: email
        },
        function(err, details) {
            if (err) {
                console.error('Error in lookup for coordinator details ', err);
                callback(err, null);
                return;
            }

            if (!details) {
                unauthCB('Coordinator profile not found..!', null);
            }
            console.log('From authenticateCoordinator', details);
            generateCoordinatorJWTToken(details, callback); // generate JWTToken
        });
};

let verifyCoordinatorJWTToken = function(token, clientToken, callback, unauthCB) {
    // @TODO verify clientToken

    let secretOrPrivateKey = getCoordinatorTokenSecret();

    jwt.verify(token, secretOrPrivateKey,
        function(err, payload) {
            if (err) {
                console.error('Error in decoding token: ', err);
                unauthCB(err);
                return;
            }
            callback(payload);
        }
    ); // end of verify
};

let generateCoordinatorJWTToken = function(details, cb) {
    let payload = details;
    let secretOrPrivateKey = getCoordinatorTokenSecret();
    let options = {
        algorithm: 'HS256',
        expiresIn: 36000,
        issuer: details.coordinatorId
    };

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
        if (err) {
            console.error('Error in generating token ', err);
        }
        cb(err, details, jwtToken);
    });
};

let getCoordinatorTokenSecret = function() {
    return 'SAMARTH-COORDINATOR-PLATFORM-SECRET';
};

module.exports = {
    authenticateCoordinator: authenticateCoordinator,
    isCoordinatorAuthenticated: verifyCoordinatorJWTToken
};
