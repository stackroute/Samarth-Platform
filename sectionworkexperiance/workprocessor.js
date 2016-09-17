var mongoose = require('mongoose');

var work = require("./workschema");

function getworkexp(candidateid, successCB, errorCB) {

    //This is a asynch op
    //Go to DB and fetch record for specified empid

    work.find({ "candidateid": candidateid },'workexperience', function(err, workexps) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(workexps);
        successCB(workexps);
    });
}


//add skill for the first time when no records are present by creating records
function createworkexp(wsobj, candidateid, sucessCB, errorCB) {
    var wrkexpObj = new work({
        candidateid: candidateid,
        workexperience: []
    });
    wrkexpObj.workexperience.push(wsobj.workexperience[0]);
    console.log("inside create new work experience:");

    wrkexpObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log('New work experience created', result);
        sucessCB(result);


        //Asynch method
        //Save empObj to DB

    });
}

//add skills into the existing records
function addworkexp(wsObj, candidateid, sucessCB, errorCB) {
    work.update({ "candidateid": candidateid }, { $push: { "workexperience": wsObj.workexperience[0] } },
        function() {
            // console.log("successfully added to ",doc);
            sucessCB("work experience added")
        }
    );
}


function updateworkexp(wsobj, candidateid, sucessCB, errorCB) {
    work.update({ 'candidateid': candidateid ,'workexperience.organisation': wsobj.workexperience[0].organisation }, 
        {'$set': 
        { 'workexperience.$.yearexp': wsobj.workexperience[0].yearexp,
         'workexperience.$.organisation': wsobj.workexperience[0].organisation ,
         'workexperience.$.role': wsobj.workexperience[0].role ,
         'workexperience.$.workplace': wsobj.workexperience[0].workplace ,
         'workexperience.$.Location': wsobj.workexperience[0].Location}},
        function() {
            sucessCB("workexperience updated");
        }

    );
}

module.exports = {
    getworkexp: getworkexp,
    createworkexp:createworkexp,
    addworkexp:addworkexp,
    updateworkexp:updateworkexp


    };
