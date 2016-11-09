let profile = require('./profileschema');

function getprofile(candidateId, successCB, errorCB) {
    profile.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            errorCB(error);
        }

        successCB(result);
    });
}

function createNewprofile(profileobj, successCB, errorCB) {
    let projectObj = new profile({

        candidateid: profileobj.mobile,
        profession: profileobj.profession
    });

    projectObj.save(function(err, savedObj) {
        if (err) {
            errorCB(err);
        }

        successCB(savedObj);
    });
}
                                                        // , errorCB
function modifyprofile(profileobj, candidateid, successCB) {
   profile.update({ candidateid: candidateid}, profileobj.profile,

      function() {
       successCB('data updated');
   }

   );
}

module.exports = {

    createNewprofile: createNewprofile,
    getprofile: getprofile,
    modifyprofile: modifyprofile

};
