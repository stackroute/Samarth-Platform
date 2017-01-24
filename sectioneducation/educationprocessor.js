let MongoClient = require('mongodb').MongoClient,
assert = require('assert');
let mongoose = require('mongoose');
let eduModel = require('./educationschema');
let educationgraphquery=require('./educationgraphquery');

function getAllEducation(successCB, errorCB) {
    // Asynch
    eduModel.find({}, function(err, docs) {

        if (err) {
            errorCB({ error: 'Internal error occurred, please report...' });
        }
        successCB(docs);
        console.log("processor of education is getting calld while updatin answers frm qbox");
    });
}
// --------ends--callbackway-----------------//
function getEducation(candidateid, successCB, errorCB) {
    eduModel.find({ candidateid: candidateid }, function(err, educationObject) {
        if (err) {
            errorCB(err);
        }
        successCB(educationObject);
        console.log("processor of education is getting calld while updatin answers frm qbox  in getEducation");

    });
}

function createNewEducation(formobj, successCB, errorCB) {
    let addEduObj = new eduModel({
        candidateid: formobj.mobile,
        qualification: []
        // qualification: formobj.qualification.length!=0 ? formobj.qualification : []
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
            console.log('updatedEmpObj --->',updatedEmpObj.qualification[0]);
            educationgraphquery.qualification_institute(
                            updatedEmpObj.qualification[0].title,candidateId,updatedEmpObj.qualification[0].institute.name,
                            function(err, success) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("created relationship of education");
                                }
                            });
            successCB('qualification updateded');
        }
    );
}

function updateEducation(candidateID, title, modifiedExistingObject, successCB, errorCB) {

   eduModel.update({ candidateid: candidateID, 'qualification.title': title }, {
     $set: {
        'qualification.$.title': modifiedExistingObject.qualification[0].title,
        'qualification.$.batch': modifiedExistingObject.qualification[0].batch,
        // 'qualification.$.from': modifiedExistingObject.qualification[0].from,
        // 'qualification.$.to': modifiedExistingObject.qualification[0].to,
        'qualification.$.academicType': modifiedExistingObject.qualification[0].academicType,
        'qualification.$.outcome.result': modifiedExistingObject.qualification[0].outcome.result,
        // 'qualification.$.outcome.unit': modifiedExistingObject.qualification[0].outcome.unit,
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

function deleteAEducation( title,candidateID, institute, successCB) {
    // eduModel.remove({ candidateID: candidateID, 'records._id': title },
    //     function(){
    //       successCB('THE EDUCATION DETAIL HAS BEEN DELEATED');
    //     },
    //     function() {
    //         errorCB('the education detail failed to be deleted');
    //     });
    console.log("hihihii"+title);
    eduModel.update({
      candidateid :candidateID,
      'qualification.title' : title,
      'qualification.institute.name' : institute
    },{
    $pull :{
      qualification: {
        title:title
      }
    }
  },function(){
    successCB(title, candidateID, institute);
  });
}

//add qualification after  entering into the question box into the existing records
function addMissingEducationFieldResponse(candidateid, educationInstanceName, fieldname, response, successCB, errorCB) {
   // console.log("------->"+educationInstanceName+"   "+fieldname+"  "+response);
    let field ;
    // console.log('----->'+field);
    let instituteFields = ['type','location','affiliation']; 
    
    let setObj = {};
    if(instituteFields.includes(fieldname)){
       field = ('qualification.$.institute.' + fieldname);
       // setObj['institute'].fieldname= response; 
    } 
   else {
     field = ('qualification.$.' + fieldname);
    }
      console.log('----->'+field);
    setObj[field] = response;
    console.log("-----------------------setObj-----------");
    console.log(setObj);
    eduModel.update({
            candidateid: candidateid,
            'qualification.title': educationInstanceName
        }, {
            $set: setObj
        },
        function(err, result) {
            if (err) {}
            successCB(result)
        console.log("------>result for education--->",result);
        console.log("=====>updating addMissingEducationFieldResponse====>");
        }

    );
}

module.exports = {
    getEducation: getEducation,
    getAllEducation: getAllEducation,
    createNewEducation: createNewEducation,
    addEducation: addEducation,
    updateEducation: updateEducation,
    deleteAEducation: deleteAEducation,
    addMissingEducationFieldResponse: addMissingEducationFieldResponse
};
