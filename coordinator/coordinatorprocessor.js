var coordinator = require('./coordinatorschema');

function createCoordinator(formobj, successPC, errorPC) {
    var coordinatorObj = new coordinator({
        coordinatorName: formobj.name,
        coordinatorId: formobj.mobile,
        coordinatorRole: formobj.role,
        coordinatorLocation: formobj.location,
        coordinatorGender: formobj.gender,
        coordinatorEmail:formobj.email,
        coordinatorPwd:formobj.pwd
    });

    console.log("Going to save Coordinator");
    coordinatorObj.save(function(err, postdetails) {
        console.log("inside save");
        if (err) {
            console.log("not posted", err);
            errorPC(err);
        } else {
            console.log('coordinator created', postdetails);
            successPC(postdetails);
        }

    });
}
module.exports = {
    createCoordinator: createCoordinator

};
