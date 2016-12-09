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
    jobprovider.find({jpCode:jpCode}).count(function(err,count){
            if(err){
                // return res.status(500).send("something went wrong");
                 errorCB(error);
            }
            if(count){
            sucessCB(count);
        }
    });
}

function getjobproviders(sucessCB, errorCB) {
    jobprovider.find(function(error, result) {
        if (error) {
            errorCB(error);
        } else {
            sucessCB(result);
        }
    });
}


module.exports = {
		getjpCodeStatus : getjpCodeStatus,
        postjobprovider: postjobprovider,
        getjobproviders : getjobproviders

}
