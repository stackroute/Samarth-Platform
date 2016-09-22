var mongoose = require('mongoose');

var work = require("./workschema");

function getworkexp(candidateid, successCB, errorCB) {

    //This is a asynch op
    //Go to DB and fetch record for specified empid

    work.find({ "candidateid": candidateid }, function(err, workexps) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(workexps);
        successCB(workexps);
    });
}


//add workexp for the first time when no records are present by creating records
function createworkexp(formobj, sucessCB, errorCB) {
    var wrkexpObj = new work({
        candidateid: formobj.mobile,
        workexperience: []
    });
    
    console.log("About to create new work experience:",wrkexpObj);

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


function updateworkexp(wsobj, candidateid,organisation, sucessCB, errorCB) {
    work.update({ 'candidateid': candidateid ,'workexperience.organisation': organisation }, 
        {'$set': 
        {'workexperience.$.organisation': wsobj.workexperience[0].organisation,
         'workexperience.$.yearexp': wsobj.workexperience[0].yearexp,
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
