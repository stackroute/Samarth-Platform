let mongoose = require('mongoose');

let work = require('./workschema');

function getworkexp(candidateid, successCB, errorCB) {
    // This is a asynch op
    // Go to DB and fetch record for specified empid

    work.find({ candidateid: candidateid }, function(err, workexps) {
        if (err) {
          //  console.log(err);
            errorCB(err);
        }
       // console.log(workexps);
        successCB(workexps);
    });
}


// add workexp for the first time when no records are present by creating records
function createworkexp(formobj, sucessCB, errorCB) {
    let wrkexpObj = new work({
        candidateid: formobj.mobile,
        workexperience: []
    });

   // console.log('About to create new work experience:', wrkexpObj);

    wrkexpObj.save(function(err, result) {
       // console.log('inside save');
        if (err) {
           // console.log(err);
            errorCB(err);
        }
       // console.log('New work experience created', result);
        sucessCB(result);


        // Asynch method
        // Save empObj to DB
    });
}

// add skills into the existing records
function addworkexp(wsObj, candidateid, sucessCB, errorCB) {
    work.update({ candidateid: candidateid }, { $push: { workexperience: wsObj.workexperience[0] } },
        function() {
            // console.log("*************************************************************",wsObj.workexperience[0].duration.duration);
            // console.log("successfully added to ",doc);
            sucessCB();
        }
        );
}


function updateworkexp(wsobj, candidateid, workplace, sucessCB, errorCB) {
    work.update({ candidateid: candidateid, 'workexperience.workplace': workplace },
        {$set:
        {'workexperience.$.designation': wsobj.workexperience[0].designation,
        'workexperience.$.workplace': wsobj.workexperience[0].workplace,
        'workexperience.$.Location': wsobj.workexperience[0].Location,
        'workexperience.$.duration.duration': wsobj.workexperience[0].duration.duration,
        'workexperience.$.duration.from': wsobj.workexperience[0].duration.from,
        'workexperience.$.duration.to': wsobj.workexperience[0].duration.to,
        'workexperience.$.skills': wsobj.workexperience[0].skills}},
        function() {
            sucessCB('workexperience updated');
        }

        );
}

module.exports = {
    getworkexp: getworkexp,
    createworkexp: createworkexp,
    addworkexp: addworkexp,
    updateworkexp: updateworkexp


};
