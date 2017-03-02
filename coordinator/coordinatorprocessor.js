let coordinator = require('./coordinatorschema');
let UserModel = require('./coordinatoruserschema');
let mongoose = require('mongoose');
let bCrypt = require('bcrypt-nodejs');
let center = require('../sectioncenterdetails/centerdetailsschema');

let coordinatoruser = mongoose.model('coordinatorusers', UserModel);

function createCoordinator(formobj, successPC, errorPC) {
    insertCoordinator(formobj, successPC, errorPC);
    let coordinatorObj = new coordinator({
        coordinatorName: formobj.name,
        coordinatorId: formobj.mobile,
        userRole: formobj.role,
        coordinatorProfession: formobj.coordinatorProfession,
        coordinatorLocation: formobj.location,
        placementCenter:formobj.placementCenter,
        coordinatorGender: formobj.gender,
        coordinatorEmail: formobj.coordinatorEmail,
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

let insertCoordinator = function(newUser, successPC, errorPC) {
        let hashed_pwd = UserModel.methods.generateHash(newUser.password);

       let newUserObj = new coordinatoruser({
            email: newUser.coordinatorEmail,
            password: hashed_pwd,
            role: newUser.role
        });

       newUserObj.save(function(err, user) {
            if (err) {
                errorPC(err);
                return;
            }

           if (!user) {
                errorPC('Unable to insert the user');
            }

           successPC(user);
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
        coordinator.update({ coordinatorId: coordi.coordinatorId}, {

                       $set: {
                                'coordinatorName': coordi.coordinatorName,
                                'coordinatorLocation': coordi.coordinatorLocation,
                                'placementCenter': coordi.placementCenter,
                                'coordinatorGender': coordi.coordinatorGender,
                                'coordinatorEmail': coordi.coordinatorEmail,
                                'coordinatorProfession': coordi.coordinatorProfession,
                                'coordinatorLanguage': coordi.coordinatorLanguage,
                                'userRole': coordi.userRole
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
          successCB(getcoordinate);
    });
}

function getcoordinatordetails(coordinatorId,successCB, errorCB) {
    coordinator.find({_id: coordinatorId}, function(err, getcoordinator) {
        if (err) {
            errorCB(err);
        }
         successCB(getcoordinator);
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
    updateCoordinator:updateCoordinator,
    getcoordinatordetails: getcoordinatordetails,
    getCenterdetails : getCenterdetails
};
