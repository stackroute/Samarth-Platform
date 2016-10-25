var sidenavcontent = require('./basedatamodel');
var mongoose = require('mongoose');
var profileRubric = require('../rubricbackend/rubricmodel');
var coordinator = require('../coordinator/coordinatorschema');
var circles = require('../circlesBackEnd/circleSchema');
var coordinatorUserModel = require('../coordinator/coordinatoruserschema');

var circle = mongoose.model('circle', circles);
var coordinatoruser = mongoose.model('coordinatorusers', coordinatorUserModel);

var insertSidenavContents = function(items, callback, errfunc) {

        var sidenavObj = new sidenavcontent({
            role: items.role,
            sidenavmenuitems: items.sidenavmenuitems
        });

        sidenavObj.save(function(err, contents) {
            if (err) {
                console.error("Error in fetching the contents ", err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    } //end of insertSidenavContents

var insertRubricContents = function(items, callback, errfunc) {

        console.log(items.scale);
        console.log(items.type);

        var rubricObj = new profileRubric({
            scale: items.scale,
            // name: items.name,
            type: items.type
                // criteria: items.criteria,
                // headers: items.headers,
                // model: items.model
        });

        rubricObj.save(function(err, contents) {
            if (err) {
                console.error("Error in fetching the contents ", err);
                callback(err, null);
                return;
            }

            console.log("from insertRubricContents", contents);
            callback(err, contents);
        });
    } //end of insertSidenavContents

var insertCoordinatorContents = function(items, callback, errfunc) {

        var coordinatorObj = new coordinator({
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
                console.error("Error in fetching the contents ", err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    } //end of insertCoordinatorContents

var insertCoordinatorUserContents = function(items, callback, errfunc) {

        var coordinatorUserObj = new coordinatoruser({
            email: items.email,
            password: items.password,
            role: items.role

        });

        coordinatorUserObj.save(function(err, contents) {
            if (err) {
                console.error("Error in fetching the contents ", err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    } //end of insertCoordinatorContents

var insertCircleContents = function(items, callback, errfunc) {

        console.log(items);

        var circleObj = new circle({
            name: items.name,
            circleDiscription: items.circleDiscription,
            domain: items.domain,
            circleType: items.circleType,
            visuality: items.visuality,
            profilePic: items.profilePic
        });

        circleObj.save(function(err, contents) {
            if (err) {
                console.error("Error in fetching the contents ", err);
                callback(err, null);
                return;
            }

            callback(err, contents);
        });
    } //end of insertSidenavContents

module.exports = {
    "insertSidenavContents": insertSidenavContents,
    "insertRubricContents": insertRubricContents,
    "insertCoordinatorContents": insertCoordinatorContents,
    "insertCoordinatorUserContents": insertCoordinatorUserContents,
    "insertCircleContents": insertCircleContents
};


// console.log(items);
// var sidenavmenuitems = [],
//     menuItems = [];

// sidenavcontent.create(items.sidenavmenuitems, function() {
//     // args[0] should be the error
//     // if (sidenavmenuitems[0]) {
//     //     throw sidenavmenuitems[0]
//     // } else {
//     for (var i = 1; i < items.sidenavmenuitems.length; i++)
//         menuItems.push(items.sidenavmenuitems[i]);
//     // }
// });

// items.sidenavmenuitems.forEach(function(a) {
//     sidenavmenuitems.push(new sidenavcontent(a));
// })

// console.log(menuItems);
