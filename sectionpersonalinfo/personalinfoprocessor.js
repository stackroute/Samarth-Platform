let mongoose = require('mongoose');
// var personalSchema=require('./personschema');
let person = require('./personalinfoschema');

function createNewpersonalinfo(formobj, successCB, errorCB) {
    let personObj = new person({
        candidateid: formobj.mobile,
        name: formobj.name,
        dob: formobj.dob,
        email: formobj.email,
        contact: formobj.mobile,
        gender: '',
        mothertongue: '',
        maritialstatus: '',
        address: '',
        location: formobj.location,
        pincode: ''

    });
    personObj.save(function(err, postdetails) {
        if (err) {
            errorCB(err);
        }
        successCB(postdetails);
    });
}

function getPersonalinfo(candidateid, successCB, errorCB) {
    person.find({ candidateid: candidateid }, function(err, getpersons) {
        if (err) {
            errorCB(err);
        }

        successCB(getpersons);
    });
}

function updatePersonalinfo(piObj, candidateId, successCB, errCB) {
    person.update({ candidateid: candidateId }, piObj.personalInfo,

        function(err, result) {
            successCB(result);
        }
    );
}

module.exports = {
    createNewpersonalinfo: createNewpersonalinfo,
    getPersonalinfo: getPersonalinfo,
    updatePersonalinfo: updatePersonalinfo
};
