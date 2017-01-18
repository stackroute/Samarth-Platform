let mongoose = require('mongoose');
let center = require('./centerdetailsschema');

function createNewcenterdetails(formobj, successCB, errorCB) {

    let centerObj = new center({
        centerCode: formobj.centerCode,
        location: formobj.location,
        email: formobj.email,
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
function updateCenterdetails(centerCode,newData,successCB, errorCB) {
    center.findOneAndUpdate({ centerCode: centerCode },newData, function(err, getupdatecenter) {
        if (err) {
            errorCB(err);
        }
        successCB(getupdatecenter);
    });
}

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

module.exports = {
    createNewcenterdetails : createNewcenterdetails,
    getAllcenterdetails : getAllcenterdetails,
    getCenterdetails : getCenterdetails,
    updateCenterdetails: updateCenterdetails,
    disableCenterdetails : disableCenterdetails,
    getcenterdetails : getcenterdetails
}