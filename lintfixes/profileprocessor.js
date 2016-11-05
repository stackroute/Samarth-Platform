let profile = require('./profileschema');

function getprofile(candidateId, successCB, errorCB) {
    profile.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }

        console.log('Inside get Project Function' + result);
        successCB(result);
    });
}

function createNewprofile(profileobj, successCB, errorCB) {
    let projectObj = new profile({

        candidateid: profileobj.mobile,
        profession: profileobj.profession
    });

    console.log('About to save a new profile: ', projectObj);

    projectObj.save(function(err, savedObj) {
        if (err) {
            console.log('Error in saving profile: ', err);
            errorCB(err);
        }

        successCB(savedObj);
    });
}
function modifyprofile(profileobj, candidateid, successCB, errorCB) {
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
