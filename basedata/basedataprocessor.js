let sidenavcontent = require('./basedatamodel');
let mongoose = require('mongoose');
let profileRubric = require('../rubricbackend/rubricmodel');
let coordinator = require('../coordinator/coordinatorschema');
let circles = require('../circlesBackEnd/circleSchema');
let coordinatorUserModel = require('../coordinator/coordinatoruserschema');

let circle = mongoose.model('circle', circles);
let coordinatoruser = mongoose.model('coordinatorusers', coordinatorUserModel);

let insertSidenavContents = function(items, callback, errfunc) {
        let sidenavObj = new sidenavcontent({
            role: items.role,
            sidenavmenuitems: items.sidenavmenuitems
        });

        sidenavObj.save(function(err, contents) {
            if (err) {
              //  console.error('Error in fetching the contents ', err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    }; // end of insertSidenavContents

let insertRubricContents = function(items, callback, errfunc) {
      //  console.log(items.scale);
       // console.log(items.type);

        let rubricObj = new profileRubric({
            scale: items.scale,
            // name: items.name,
            type: items.type
                // criteria: items.criteria,
                // headers: items.headers,
                // model: items.model
        });

        rubricObj.save(function(err, contents) {
            if (err) {
               // console.error('Error in fetching the contents ', err);
                callback(err, null);
                return;
            }

           // console.log('from insertRubricContents', contents);
            callback(err, contents);
        });
    }; // end of insertSidenavContents

let insertCoordinatorContents = function(items, callback, errfunc) {
        let coordinatorObj = new coordinator({
            coordinatorName: items.coordinatorName,
            coordinatorId: items.coordinatorId,
            coordinatorRole: items.coordinatorRole,
            coordinatorLocation: items.coordinatorLocation,
            coordinatorGender: items.coordinatorGender,
            coordinatorEmail: items.coordinatorEmail,
            coordinatorPwd: items.coordinatorPwd
        });

        coordinatorObj.save(function(err, contents) {
            if (err) {
               // console.error('Error in fetching the contents ', err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    }; // end of insertCoordinatorContents

let insertCoordinatorUserContents = function(items, callback, errfunc) {
        let coordinatorUserObj = new coordinatoruser({
            email: items.email,
            password: items.password,
            role: items.role

        });

        coordinatorUserObj.save(function(err, contents) {
            if (err) {
               // console.error('Error in fetching the contents ', err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    }; // end of insertCoordinatorContents

let insertCircleContents = function(items, callback, errfunc) {
       // console.log(items);

        let circleObj = new circle({
            name: items.name,
            circleDiscription: items.circleDiscription,
            domain: items.domain,
            circleType: items.circleType,
            visuality: items.visuality,
            profilePic: items.profilePic
        });

        circleObj.save(function(err, contents) {
            if (err) {
              //  console.error('Error in fetching the contents ', err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    }; // end of insertSidenavContents

module.exports = {
    insertSidenavContents: insertSidenavContents,
    insertRubricContents: insertRubricContents,
    insertCoordinatorContents: insertCoordinatorContents,
    insertCoordinatorUserContents: insertCoordinatorUserContents,
    insertCircleContents: insertCircleContents
};
