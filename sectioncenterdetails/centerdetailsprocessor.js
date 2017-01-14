let mongoose = require('mongoose');
let center = require('./centerdetailsschema');

function createNewcenterdetails(formobj, successCB, errorCB) {

    let centerObj = new center({
        reg: formobj.reg,
        location: formobj.location,
        address: formobj.address,
        mobile: formobj.mobile,
        name: formobj.name,
        centertype: formobj.centertype,
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

function getCenterdetails(reg, successCB, errorCB) {
    center.find({ reg: reg }, function(err, getcenter) {
        if (err) {
            errorCB(err);
        }
        successCB(getcenter);
    });
}
function updateCenterdetails(reg, successCB, errorCB) {
    center.update({ reg: reg }, function(err, getupdatecenter) {
        if (err) {
            errorCB(err);
        }
        successCB(getupdatecenter);
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
    getcenterdetails : getcenterdetails
}