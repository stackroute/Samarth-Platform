let coordinator = require('./coordinatorschema');
let UserModel = require('./coordinatoruserschema');
let mongoose = require('mongoose');
let bCrypt = require('bcrypt-nodejs');

let coordinatoruser = mongoose.model('coordinatorusers', UserModel);

function createCoordinator(formobj, successPC, errorPC) {
    let coordinatorObj = new coordinator({
        coordinatorName: formobj.name,
        coordinatorId: formobj.mobile,
        userRole: formobj.role,
        coordinatorProfession: formobj.profession,
        coordinatorLocation: formobj.location,
        coordinatorGender: formobj.gender,
        coordinatorEmail: formobj.email,
        // coordinatorPwd: formobj.pwd,
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

// let updateCoordinator = function(coordinatorId,newData,suceessCB) {
//     coordinator.update({'coordinatorId':coordinatorId},{$set: newData}, function(err,updatecoordi)
//     {
//       if (err) {
//             // errorCB(err);
//         }
//         console.log(updatecoordi);
//     });
// }


function updateCoordinator(coordi, sucessCB) {
        console.log(coordi);
        coordinator.update({ coordinatorId: coordi.mobile}, {

                        $set: {
                                'coordinatorName': coordi.name,
                                'coordinatorLocation': coordi.location,
                                'coordinatorGender': coordi.gender,
                                'coordinatorEmail': coordi.email,
                                'coordinatorProfession': coordi.profession,
                                'coordinatorLanguage': coordi.language,
                                'coordinatorRole': coordi.role
                        }
                },
                function() {
                        sucessCB(' updated');
                }

        );
}

function getcoordinator(successCB, errorCB) {
    coordinator.find({}, function(err, getcoordinate) {
        if (err) {
            errorCB(err);
        }
        console.log(getcoordinate);
        successCB(getcoordinate);
    });
}

// function deleteCoordinator(coordinatorID, successCB) {
//     console.log(coordinatorID);
//     cooedinator.update({
//       coordinatorid :coordinatorID
//     },{
//     $pull :{
//       coordinator: {
//         coordinatorID:coordinatorID
//       }
//     }
//   },function(){
//     successCB(title, coordinatorID);
// });
// }

module.exports = {
    createCoordinator: createCoordinator,
    insertCoordinator: insertCoordinator,
    getcoordinator:getcoordinator,
    getProfessions: getProfessions,
    updateCoordinator:updateCoordinator
};
