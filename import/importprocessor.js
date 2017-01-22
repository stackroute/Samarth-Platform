let importschema = require('./importschema');

function createImportData(fileData,fileName, successPC, errorPC) {
    let importObj = new importschema({
        profileType: "candidate profile",
        status: "processing",
        data: fileData,
        fileName: fileName
    });

    importObj.save(function(err, postdetails) {

        if (err) {
            errorPC(err);
        } else {
            successPC(postdetails._id);
        }
    });
}

function getData(uploadedId,successCB, errorCB) {
    
     importschema.find({ _id: uploadedId }, function(error, result) {
            if (error) {
                // console.log(error);
                errorCB(error);
            }

            successCB(result);
        });
}

module.exports = {
    createImportData: createImportData,
    getData: getData
};