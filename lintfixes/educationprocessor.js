let MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
let mongoose = require('mongoose');
let eduModel = require('./educationschema');

function getAllEducation(successCB, errorCB) {
    console.log('About to do a find query... ');
    // Asynch
    eduModel.find({}, function(err, docs) {
        console.log('I am inside the find callback... ');

        if (err) {
            console.log('Internal database error in fetching education document ', err);
            errorCB({ error: 'Internal error occurred, please report...' });
        }
        console.log('got the data from db: ', docs);
        successCB(docs);
    });
    console.log('returning  ');
}
// --------ends--callbackway-----------------//
function getEducation(candidateid, successCB, errorCB) {
    eduModel.find({ candidateid: candidateid }, function(err, educationObject) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(educationObject);
        successCB(educationObject);
    });
}

function createNewEducation(formobj, successCB, errorCB) {
    let addEduObj = new eduModel({
        candidateid: formobj.mobile,
        qualification: []
    });
    // addEduObj.qualification.push(newEmpObj.record[0]);
    console.log('About to save a new Education obj: ', addEduObj);
    addEduObj.save(function(err, res) {
        if (err) {
            console.log('Error in saving project: ', err);
            errorCB(err);
        }
        successCB(res);
    });
}

function addEducation(updatedEmpObj, candidateId, successCB, errCB) {
    eduModel.update({ candidateid: candidateId }, { $push: { qualification: updatedEmpObj.qualification[0] } },
        function() {
            successCB('qualification updateded');
        }
    );
}

function updateEducation(candidateID, title, modifiedExistingObject, successCB, errorCB) {
    // console.log("got", modifiedExistingObject.record[0].title);
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
