var rubric = require('./rubricmodel');

// The rubric processor
function getrubric(name, profiletype, successCB, errorCB) {
    rubric.find({ "name": name, "profiletype": profiletype }, function(error, result) {
        if (error) {
            console.log(error);
            errorCB(error);
        }

        console.log("Inside getrubric Function" + result);
        successCB(result);
    });
};

module.exports = {
    getrubric: getrubric
};
// function updaterubric(newrubricObj, profiletype, successCB, errorCB) {

//     rubric.update({ 'profiletype': profiletype }, newcandidateObj,
//         function() {
//             successCB("rubric updated");
//         }

//     );
// };
