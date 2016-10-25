var coordinator = require('./coordinatorschema');
var UserModel = require('./coordinatoruserschema');


var mongoose = require('mongoose');

var login = mongoose.model('login', UserModel);

function createCoordinator(formobj, successPC, errorPC) {
    var coordinatorObj = new coordinator({
        coordinatorName: formobj.name,
        coordinatorId: formobj.mobile,
        coordinatorRole: formobj.role,
        coordinatorProfession: formobj.profession,
        coordinatorLocation: formobj.location,
        coordinatorGender: formobj.gender,
        coordinatorEmail: formobj.email,
        coordinatorPwd: formobj.pwd
    });

    console.log("Going to save Coordinator");
    coordinatorObj.save(function(err, postdetails) {
        console.log("inside save");
        if (err) {
            console.log("not posted", err);
            errorPC(err);
        } else {

            console.log('coordinator created', postdetails);
            successPC(postdetails);
        }

    });
}

var insertCoordinator = function(newUser, callback, unauth) {
        var newUserObj = new login({
            "email": newUser.email,
            "password": newUser.pwd,
            "role": newUser.role
        });

        newUserObj.save(function(err, user) {
            if (err) {
                console.error("Error in signup user ", err);
                callback(err, null);
                return;
            }

            if (!user) {
                console.error("Empty user signed up..!");
                callback("Unable to insert the user", null);
            }

            console.log("from insertCoordinatort", user);
            callback(err, user);
        });


    } //end of insertCoordinator

module.exports = {
    createCoordinator: createCoordinator,
    insertCoordinator: insertCoordinator

};
