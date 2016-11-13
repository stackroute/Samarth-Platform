let mongoose = require('mongoose');

let work = require('./workschema');
 
let workneoprocessor = require("./workneoprocessor");

function getworkexp(candidateid, successCB, errorCB) {
    // This is a asynch op
    // Go to DB and fetch record for specified empid

    work.find({ candidateid: candidateid }, function(err, workexps) {
        if (err) {
            errorCB(err);
        }
        successCB(workexps);
    }); 
}

// add workexp for the first time when no records are present by creating records
function createworkexp(formobj, sucessCB, errorCB) {
    let wrkexpObj = new work({
        candidateid: formobj.mobile,
        workexperience: []
    });

    wrkexpObj.save(function(err, result) {
        if (err) {
            errorCB(err);
        }
        sucessCB(result);

        // Asynch method
        // Save empObj to DB
    });
}

// add skills into the existing records
// , errorCB
function addworkexp(wsObj, candidateid, sucessCB) {
    work.update({ candidateid: candidateid }, {
            $push: {
                workexperience: wsObj.workexperience[0]
            }
        },
        function() {
            workneoprocessor.DesignationRelationBuilder(wsObj.workexperience[0].designation,
            wsObj.workexperience[0].workplace, wsObj.workexperience[0].Location, candidateid,
            function(err, result) {

                    if (result) {
                        sucessCB();
                    }

                });
            sucessCB();
        }
    );
}

// , errorCB
function updateworkexp(wsobj, candidateid, workplace, sucessCB) {
    work.update({ candidateid: candidateid, 'workexperience.workplace': workplace }, {
            $set: {
                'workexperience.$.designation': wsobj.workexperience[0].designation,
                'workexperience.$.workplace': wsobj.workexperience[0].workplace,
                'workexperience.$.Location': wsobj.workexperience[0].Location,
                'workexperience.$.duration.duration': wsobj.workexperience[0].duration.duration,
                'workexperience.$.duration.from': wsobj.workexperience[0].duration.from,
                'workexperience.$.duration.to': wsobj.workexperience[0].duration.to,
                'workexperience.$.skills': wsobj.workexperience[0].skills
            }
        },
        function() {
            sucessCB('workexperience updated');
        }

    );
}


//add work exp after  entering into the question box into the existing records
function addMissingWorkFieldResponse(candidateid, workInstanceName, fieldname, response, successCB, errorCB) {
   // console.log("------->"+skillInstanceName+"   "+fieldname+"  "+response);
    let field = ('workexperience.$.' + fieldname);
    let setObj = {};
    setObj[field] = response;

    work.update({
            candidateid: candidateid,
            'workexperience.designation': workInstanceName
        }, {
            $set: setObj
        },
        function(err, result) {
            if (err) {}
            successCB(result)
        // console.log("------>result for skills--->"+result);
        }

    );
}
module.exports = {
    getworkexp: getworkexp,
    createworkexp: createworkexp,
    addworkexp: addworkexp,
    updateworkexp: updateworkexp,
    addMissingWorkFieldResponse: addMissingWorkFieldResponse
};
