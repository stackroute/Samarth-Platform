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


module.exports = {

    postjobprovider: postjobprovider

}
