let preference = require('./jobpreferencesschema');

function getPreferences(candidateId, successCB, errorCB) {
    preference.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            errorCB(error); 
        }
        successCB(result);
    });
} 


function createNewPreferences(formobj,successCB,errorCB) {
    console.log("create starting");
    let preferenceObj = new preference({
        candidateid: formobj.mobile,
        preferences:{}
    });

    preferenceObj.save(function(err, result) {
        if (err) {
            errorCB(err);
        }
        successCB(result);

    });
}


function updatePreferences(oldPreferenceObj, candidateId, successCB, errCB) {
 preference.update({ candidateid: candidateId }, oldPreferenceObj,
    function(err, result) {
        if(err){console.log("erororupda");}

        successCB(result);
    }
    );
}

module.exports = {
    getPreferences: getPreferences,
    createNewPreferences: createNewPreferences,
    updatePreferences: updatePreferences,
};