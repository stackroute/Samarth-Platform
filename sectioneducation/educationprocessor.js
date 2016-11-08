let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
let mongoose = require('mongoose');
let eduModel = require('./educationschema');

function getAllEducation(successCB, errorCB) {
    // Asynch
    eduModel.find({}, function(err, docs) {

        if (err) {
            errorCB({ error: 'Internal error occurred, please report...' });
        }
        successCB(docs);
    });
}
// --------ends--callbackway-----------------//
function getEducation(candidateid, successCB, errorCB) {
    eduModel.find({ candidateid: candidateid }, function(err, educationObject) {
        if (err) {
            errorCB(err);
        }
        successCB(educationObject);
    });
}

function createNewEducation(formobj, successCB, errorCB) {
    let addEduObj = new eduModel({
        candidateid: formobj.mobile,
        qualification: []
    });

    addEduObj.save(function(err, res) {
        if (err) {

            errorCB(err);
        }
        successCB(res);
    });
}

function addEducation(updatedEmpObj, candidateId, successCB, errCB) {
    eduModel.update({ candidateid: candidateId }, { $push:
                                { qualification: updatedEmpObj.qualification[0] } },
        function() {
            successCB('qualification updateded');
        }
    );
}

function updateEducation(candidateID, title, modifiedExistingObject, successCB, errorCB) {
    
   eduModel.update({ candidateid: candidateID, 'qualification.title': title }, {
     $set: {
        'qualification.$.title': modifiedExistingObject.qualification[0].title,
        'qualification.$.batch': modifiedExistingObject.qualification[0].batch,
        'qualification.$.from': modifiedExistingObject.qualification[0].from,
        'qualification.$.to': modifiedExistingObject.qualification[0].to,
        'qualification.$.academicType': modifiedExistingObject.qualification[0].academicType,
        'qualification.$.outcome.result': modifiedExistingObject.qualification[0].outcome.result,
        'qualification.$.outcome.unit': modifiedExistingObject.qualification[0].outcome.unit,
        'qualification.$.institute.name': modifiedExistingObject.qualification[0].institute.name,
        'qualification.$.institute.type': modifiedExistingObject.qualification[0].institute.type,
        'qualification.$.institute.location': modifiedExistingObject.qualification[0].institute.location,
        'qualification.$.institute.affiliation': modifiedExistingObject.qualification[0].institute.affiliation,
        'qualification.$.institute.metadata': modifiedExistingObject.qualification[0].institute.metadata
      }
    },
        function() {
            successCB('the existing qualification has been modified');
        }
    );
}

function deleteEducation(candidateID, qualificationID, deletingObj, successCB, errorCB) {
    eduModel.remove({ candidateID: candidateID, 'records._id': qualificationID },
        function() {
            successCB('THE EDUCATION DETAIL HAS BEEN DELETED');
        },
        function() {
            errorCB('the education detail failed to be deleted');
        });
}
module.exports = {
    getEducation: getEducation,
    getAllEducation: getAllEducation,
    createNewEducation: createNewEducation,
    addEducation: addEducation,
    updateEducation: updateEducation,
    deleteEducation: deleteEducation
};
