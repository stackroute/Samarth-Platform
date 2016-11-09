let candidate = require('./candidateschema');

function getcandidate(candidateId, successCB, errorCB) {
  candidate.find({ candidateid: candidateId }, function(error, result) {
    if (error) {
       // console.log(error);
        errorCB(error);
    }

    // console.log("Inside get candidate Function" + result);
    successCB(result);
});
}

function createNewcandidate(formObj, successCB, errorCB) {
    let candidateObj = new candidate({
        "candidateid": formObj.mobile,
        // "profession": formObj.profession
    });
    // console.log("--->under candi------>");
    //  var id="candidateid":candidateid;
    // projectObj.profile.push(id);
    //  projectObj.profile.push(newProjectObj.profile[0]);

 //   console.log("About to save a new candidate: ", candidateObj);

 candidateObj.save(function(err, savedObj) {
    if (err) {
       // console.log('Error in saving candidate: ', err);
        errorCB(err);
    }

    successCB(savedObj);
});
}

function updatecandidate(newcandidateObj, candidateid, successCB, errorCB) {
 candidate.update({ candidateid: candidateid}, newcandidateObj,
    function() {
        successCB('candidate updated');
    }

    );
}

module.exports = {

    createNewcandidate: createNewcandidate,
    getcandidate: getcandidate,
    updatecandidate: updatecandidate

};
