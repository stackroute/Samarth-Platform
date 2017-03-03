let mongoose = require('mongoose');
let person = require('../sectionpersonalinfo/personalinfoschema');
let center = require('./centerdetailsschema');
function createNewcenterdetails(formobj, successCB, errorCB) {
    let centerObj = new center({
        centerCode: formobj.centerCode,
        centerLocation: formobj.centerLocation,
        email: formobj.email,
        region: formobj.region,
        address: formobj.address,
        mobile: formobj.mobile,
        cname: formobj.cname,
        centerType: formobj.centerType,
        status: formobj.status

    });
    centerObj.save(function(err, postdetails) {
        console.log("hi"+postdetails);
        if (err) {
            errorCB(err);
        }
        successCB(postdetails);
    });
}
function getAllcenterdetails(successCB, errorCB) {
    center.find({}, function(err, getcenters) {
        if (err) {
            errorCB(err);
        }
        console.log(getcenters);
        successCB(getcenters);
    });
}
function getCenterdetails(centerCode, successCB, errorCB) {
    center.find({ centerCode: centerCode }, function(err, getcenter) {
        if (err) {
            errorCB(err);
        }
        successCB(getcenter);
    });
}
    // Updating center details
function updateCenterdetails(centerCode,newData,successCB, errorCB) {
    center.findOneAndUpdate({ centerCode: centerCode },newData, function(err, getupdatecenter) {
        if (err) {
            errorCB(err);
        }
        successCB(getupdatecenter);
    });
}
    // Disable center details by admin
function disableCenterdetails(centerCode,newDisable,successCB, errorCB) {
    center.findOneAndUpdate({ centerCode: centerCode },{status:"Disable"}, function(err, getupdatestatus) {
        if (err) {
            errorCB(err);
        }
        successCB(getupdatestatus);
    });
}
function getcenterdetails(sucessCB, errorCB) {
    center.find(function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}

    // Fetching center code from personal info schema
function getPersonalCenter(candidateid, successCB, errorCB) {
    person.find({ candidateid: candidateid }, function(err, getpersonalcenter) {
        if (err) {
            errorCB(err);
        }
        // console.log("Processor success");
        // console.log(getpersonalcenter);
        successCB(getpersonalcenter);
    });
}
    // Fetching center of particular candidate
function getPersonalCenterDetails(id, successCB, errorCB) {
    center.find({centerCode: id}, function(err, getParticularDetails) {
        if (err) {
            errorCB(err);
        }
        successCB(getParticularDetails);
    })
}


module.exports = {
    createNewcenterdetails : createNewcenterdetails,
    getAllcenterdetails : getAllcenterdetails,
    getCenterdetails : getCenterdetails,
    updateCenterdetails: updateCenterdetails,
    disableCenterdetails : disableCenterdetails,
    getcenterdetails : getcenterdetails,
    getPersonalCenter : getPersonalCenter,
    getPersonalCenterDetails : getPersonalCenterDetails
}
