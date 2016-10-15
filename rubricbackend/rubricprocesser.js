var rubric = require('./rubricmodel');

function getrubric(profiletype, successCB, errorCB) {
    rubric.find({ "profiletype": profiletype }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }

        console.log("Inside getrubric Function" + result);
        successCB(result);
    });
};

// function updaterubric(newrubricObj, profiletype, successCB, errorCB) {

    //     rubric.update({ 'profiletype': profiletype }, newcandidateObj,
    //         function() {
    //             successCB("rubric updated");
    //         }

    //     );
    // };

