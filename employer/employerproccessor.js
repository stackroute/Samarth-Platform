let employer = require('./employerschema');

function getEmployerByID(employerID, sucessCB, errorCB) {
    employer.find({ employerID: employerID }, function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}

function postEmployer(employerData, sucessCB, errorCB) {
    let employerObj = new employer(employerData);
    employerObj.save(function(err) {
        if (err) {
            errorCB(err);
        } else {
            sucessCB('successfully inserted data');
        }
    });
}

function getEmployers(sucessCB, errorCB) {
    employer.find(function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}

/* exports the functionalities in employerprocessor*/
module.exports = {
    getEmployerByID: getEmployerByID,
    postEmployer: postEmployer,
    getEmployers: getEmployers
};
