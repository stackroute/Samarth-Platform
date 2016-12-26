let preference = require('./jobpreferencesschema');

function getPreferences(candidateId, successCB, errorCB) {
    preference.find({ candidateid: candidateId }, function(error, result) {
        if (error) {
            errorCB(error); 
            console.log("get");
        }
        successCB(result);
    });
} 
 
function createNewPreferences(formobj,successCB,errorCB) {
    console.log("create");
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
    console.log("update new");
    console.log(oldPreferenceObj);
    console.log(oldPreferenceObj.preferences);
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
