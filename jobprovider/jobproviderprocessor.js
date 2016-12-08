let jobprovider = require('./jobproviderschema');
function postjobprovider(jobproviderdata, sucessCB, errorCB) {
    let jobproviderobj = new jobprovider(jobproviderdata);
    jobproviderobj.save(function(err) {
        if (err) {
            errorCB(err);
        } else {
            sucessCB('successfully inserted data');
        }
    });
}

function getjpCodeStatus(jpCode, sucessCB, errorCB) {
    jobprovider.find({ jpCode: jpCode }, function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}


module.exports = {
		getjpCodeStatus : getjpCodeStatus,
    postjobprovider: postjobprovider

}
