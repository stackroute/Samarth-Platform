let verification = require('./verificationmodel');

// The verification processor
function getverification(candidateid, successCB, errorCB) {
    verification.find({ candidateid: candidateid }, function(error, result) {
        if (error) {
         //   console.log(error);
            errorCB(error);
        }


        successCB(result);
    });
}

function createNewVerification(candidatedata, successCB, errorCB) {
    // console.log(candidatedata.mobile);
    // console.log(candidatedata.candidatename);

    let newVerfobj = new verification({

        candidateid: candidatedata.mobile,
        candidatename: candidatedata.name

    });

   // console.log('about to save new verification object', newVerfobj);

    newVerfobj.save(function(err, savedobj) {
        if (err) {
           // console.log('error in saving the verification data');
            errorCB(err);
        }
        successCB(savedobj);
    });
}

function updateverification(candidatedata, typename, sucessCB, errorCB) {
   // console.log('update method', candidatedata);
    if (typename === 'Personal_Information') {
        verification.update({ candidateid: candidatedata.candidateid }, {
            $set: {
                updated_on: candidatedata.updated_on,
                'Personal_Information.value': candidatedata.Personal_Information.value,
                'Personal_Information.remarks': candidatedata.Personal_Information.remarks
            }
        }, function(err, result) {
            if (err) {
               // console.log('Error occured on save' + err);
                errorCB(err);
            } else {
               // console.log('updated successfully');
                sucessCB('OK');
            }
        });
    }
    if (typename === 'Work_History') {
        verification.update({ candidateid: candidatedata.candidateid }, {
            $set: {
                updated_on: candidatedata.updated_on,
                'Work_History.value': candidatedata.Work_History.value,
                'Work_History.remarks': candidatedata.Work_History.remarks
            }
        }, function(err, result) {
            if (err) {
              //  console.log('Error occured on save' + err);
                errorCB(err);
            } else {
                // console.log('updated successfully');
                sucessCB('OK');
            }
        });
    }
    if (typename === 'Project') {
        verification.update({ candidateid: candidatedata.candidateid }, {
            $set: {
                updated_on: candidatedata.updated_on,
                'Project.value': candidatedata.Project.value,
                'Project.remarks': candidatedata.Project.remarks
            }
        }, function(err, result) {
            if (err) {
              //  console.log('Error occured on save' + err);
                errorCB(err);
            } else {
               // console.log('updated successfully');
                sucessCB('OK');
            }
        });
    }
    if (typename === 'Qualification') {
        verification.update({ candidateid: candidatedata.candidateid }, {
            $set: {
                updated_on: candidatedata.updated_on,
                'Qualification.value': candidatedata.Qualification.value,
                'Qualification.remarks': candidatedata.Qualification.remarks
            }
        }, function(err, result) {
            if (err) {
              //  console.log('Error occured on save' + err);
                errorCB(err);
            } else {
               // console.log('updated successfully');
                sucessCB('OK');
            }
        });
    }
    if (typename === 'Skills') {
        verification.update({ candidateid: candidatedata.candidateid }, {
            $set: {
                updated_on: candidatedata.updated_on,
                'Skills.value': candidatedata.Skills.value,
                'Skills.remarks': candidatedata.Skills.remarks
            }
        }, function(err, result) {
            if (err) {
               // console.log('Error occured on save' + err);
                errorCB(err);
            } else {
               // console.log('updated successfully');
                sucessCB('OK');
            }
        });
    }
}

module.exports = {
    getverification: getverification,
    updateverification: updateverification,
    createNewVerification: createNewVerification
};
