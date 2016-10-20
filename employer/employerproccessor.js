var employer = require('./employerschema');

function getEmployerByID(employerID, sucessCB, errorCB) {
    employer.find({ "employerID": employerID }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        } else {
            console.log("Found  the employer with jobID");
            sucessCB(result);
        }
    });
}

function postEmployer(employerData, sucessCB, errorCB) {
    var employerObj = new employer(employerData);
    employerObj.save(function(err) {
        if (err) {
            console.log("Error occured on save" + err);
            errorCB(err);
        } else {
            console.log("employer Posted successfully");
            sucessCB("successfully inserted data");
        }
    });
}

function getEmployers(sucessCB, errorCB) {
    employer.find(function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        } else {
            console.log("All the emloyers is fetched");
            sucessCB(result);
        }
    })
}

/*exports the functionalities in employerprocessor*/
module.exports = {
    getEmployerByID: getEmployerByID,
    postEmployer: postEmployer,
    getEmployers: getEmployers
};
