let coordinator = require('./coordinatorschema');
let UserModel = require('./coordinatoruserschema');
let mongoose = require('mongoose');
let bCrypt = require('bcrypt-nodejs');

let coordinatoruser = mongoose.model('coordinatorusers', UserModel);

function createCoordinator(formobj, successPC, errorPC) {
    let coordinatorObj = new coordinator({
        coordinatorName: formobj.name,
        coordinatorId: formobj.mobile,
        coordinatorRole: formobj.role,
        coordinatorProfession: formobj.profession,
        // coordinatorLocation: formobj.location,
        coordinatorGender: formobj.gender,
        coordinatorEmail: formobj.email,
        coordinatorPwd: formobj.pwd,
        coordinatorLanguage: formobj.language
    });

    coordinatorObj.save(function(err, postdetails) {

        if (err) {
            errorPC(err);
        } else {
            successPC(postdetails);
        }
    });
}

let insertCoordinator = function(newUser, callback, unauth) {
        let hashed_pwd = UserModel.methods.generateHash(newUser.pwd);

        let newUserObj = new coordinatoruser({
            email: newUser.email,
            password: hashed_pwd,
            role: newUser.role
        });

        newUserObj.save(function(err, user) {
            if (err) {
                callback(err, null);
                return;
            }

            if (!user) {
                callback('Unable to insert the user', null);
            }

            callback(err, user);
        });
    }; // end of insertCoordinator

module.exports = {
    createCoordinator: createCoordinator,
    insertCoordinator: insertCoordinator,
    getProfessions: getProfessions

};
