var verification = require('./verificationmodel');

// The verification processor
function getverification(candidateid, successCB, errorCB) {
    verification.find({ "candidateid": candidateid }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }

        // console.log("Inside getverification Function" + result);
        successCB(result);
    });
};

function updateverification(candidatedata, sucessCB, errorCB) {
    console.log("update method", candidatedata);
    verification.update({ candidateid: candidatedata.candidateid }, {
            '$set': {
                verification_status: candidatedata.verification_status,
                verification_ratings: candidatedata.verification_ratings
            }
        },

        function(err, result) {
            if (err) {
                console.log("Error occured on save" + err);
                errorCB(err);
            } else {
                console.log("updated successfully");
                sucessCB("OK");
            }
        });
};

module.exports = {
    getverification: getverification,
    updateverification: updateverification
};
