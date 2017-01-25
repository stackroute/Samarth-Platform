let preference = require('./jobpreferencesschema');

function getPreferences(candidateId, successCB, errorCB) {
    preference.find({ candidateid: candidateId }, function(error, result) {

         if (error) {
            errorCB(error); 
        }
        successCB(result);
        console.log("the result is like");
        console.log(result);
      // console.log("geywgehwjsjw");
    });
} 



function createNewPreferences(formobj, successCB, errorCB ) {
    console.log("create starting");
    let preferenceObj = new preference({
        candidateid: formobj.mobile,
        preferences:{}
        // preferences:formobj.preferences.length!=0 ? formobj.preferences : []
    });

    preferenceObj.save(function(err, result) {
        if (err) {

            // console.log("erororupda");
            errorCB(err);
            return;
        }
        successCB(result);
        // console.log(successCB);

    });
}


function updatePreferences(oldPreferenceObj, candidateId, successCB, errCB) {
    console.log("oldPreferenceObj..");
    console.log(oldPreferenceObj);
 preference.update({ candidateid: candidateId }, { $set: {
  preferences: oldPreferenceObj.preferences } },
    function(err, result) {
        if(err){
            console.log("Unable to update job preferences");
        }
        console.log('result.....', result);
        successCB(result);
    });
}

function addMissingJobpreferencesFieldResponse(candidateid, instancename, fieldname, response, successCB, errorCB) {
   // console.log("------->"+educationInstanceName+"   "+fieldname+"  "+response);
    let field =  fieldname;
    let setObj = {};
    setObj[field] = response;

    preference.update({
            candidateid: candidateid,
        }, {
            $set: setObj
        },
        function(err, result) {
            if (err) {}
            successCB(result)
        }

    );
}

module.exports = {
    getPreferences: getPreferences,
    createNewPreferences: createNewPreferences,
    updatePreferences: updatePreferences,
    addMissingJobpreferencesFieldResponse:addMissingJobpreferencesFieldResponse
};
