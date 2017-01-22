var jwt = require('jsonwebtoken');
const config = require('../config/config');
var PersonalInfoModel = require("../sectionpersonalinfo/personalinfoschema");

var authenticateClient = function(clientId, clientSecret, callback, unauthCB) {
    if (clientId === "SAMARTH-SKILL-PROFILE") {
        candidateProfile = {
            client: "SAMARTH-SKILL-PROFILE",
            role: 'webapp'
        }
        generateClientJWTToken(candidateProfile, callback); //generate JWTToken
    } else {
        unauthCB("Client profile not found..!", null);
    }
}

var authenticateCandidate = function(candidateId, clientToken, callback,
    unauthCB) {

    //@TODO Validate clientToken and authorize candidate if clientToken is valid

    PersonalInfoModel.findOne({
            candidateid: candidateId
        }, {
            _id: 0,
            __v: 0,
            address: 0,
            pincode: 0
        },
        function(err, candidateProfile) {
            if (err) {
              //  console.error("Error in lookup for candidate profile ", err);
                callback(err, null);
                return;
            }

            if (!candidateProfile) {
                unauthCB("Candidate profile not found..!", null);
            }

            console.log('')
            generateCandidateJWTToken(candidateProfile, callback); //generate JWTToken
        });
};

var generateClientJWTToken = function(client, cb) {
    var payload = client.clientid;
    // var secretOrPrivateKey = 'SAMARTH-CLIENT-PLATFORM-SECRET';
    var options = {
        algorithm: "HS256",
        expiresIn: 36000,
        issuer: client.clientid
    };

    jwt.sign(payload, config.SECRETKEY, options, function(err, jwtToken) {
        cb(err, client, jwtToken);
    });
}

var generateCandidateJWTToken = function(candidateProfile, cb) {
    var payload = candidateProfile;
    var secretOrPrivateKey = getCandidateTokenSecret();
    var options = {
        algorithm: "HS256",
        expiresIn: 36000,
        issuer: candidateProfile.candidateid
    };

    jwt.sign(payload, secretOrPrivateKey, options, function(err, jwtToken) {
        if (err) {
            console.error("Error in generating token ", err);
        }
        cb(err, candidateProfile, jwtToken);
    });
}

var verifyCandidateJWTToken = function(token, clientToken, callback, unauthCB) {
    //@TODO verify clientToken

    var secretOrPrivateKey = getCandidateTokenSecret();

    jwt.verify(token, secretOrPrivateKey,
        function(err, payload) {
            if (err) {
              //  console.error("Error in decoding token: ", err);
                unauthCB(err);
                return;
            }
            callback(payload);
        }
    ); //end of verify
}

var getCandidateTokenSecret = function() {
    return config.SECRETKEY;
}

module.exports = {
    authenticateCandidate: authenticateCandidate,
    authenticateClient: authenticateClient,
    isCandidateAuthenticated: verifyCandidateJWTToken
}
