var mongoose = require('mongoose');
// var personalSchema=require('./personschema');
var person = require("./personalinfoschema");

function createNewpersonalinfo(formobj, successCB, errorCB) {
    var personObj = new person({
        candidateid: formobj.mobile,
        name: formobj.name,
        dob: formobj.dob,
        email: formobj.email,
        contact: formobj.mobile,
        gender: "",
        mothertongue: "",
        maritialstatus: "",
        address: "",
        location: formobj.location,
        pincode: ""

    });
    // penalInfo = formobj;
    console.log("About to Save personalinfo", personObj);

    personObj.save(function(err, postdetails) {
        console.log("inside save");
        if (err) {
            console.log("not posted", err);
            errorCB(err);
        }
        console.log('New person created', postdetails);
        successCB(postdetails);

    });
}

function getPersonalinfo(candidateid, successCB, errorCB) {

    person.find({ "candidateid": candidateid }, function(err, getpersons) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(getpersons);
        successCB(getpersons);
    });
}

function updatePersonalinfo(piObj, candidateId, successCB, errCB) {
    console.log(piObj.personalInfo.gender);
    person.update({ "candidateid": candidateId }, piObj.personalInfo,

        function(err, result) {
            //errCB(err);
            successCB(result)
        }
    );
};

module.exports = {
    createNewpersonalinfo: createNewpersonalinfo,
    getPersonalinfo: getPersonalinfo,
    updatePersonalinfo: updatePersonalinfo
};
