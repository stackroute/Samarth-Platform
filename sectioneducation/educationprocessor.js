var MongoClient = require('mongodb').MongoClient,
assert = require('assert');
var mongoose=require('mongoose');
var eduModel=require('./educationschema');
/*mongoose.connect('mongodb://localhost:27017/sectionEducationDetails');*/
// function getEducation() {
//   var myPromise = new Promise(function(resolve, reject){
//     eduModel.find({},function(err,docs) {
//     console.log("I am inside the find callback... ")
//     if(err) { 
//       console.log("Internal database error in fetching education document ", err);
//       reject({error:'Internal error occurred, please report...'});
//     }
//     console.log("got the data from db: ", docs);
//     resolve(docs);
//   });  
//   });
//   return myPromise;
// };
//----------callbackway-----------------//
function getAllEducation(successCB, errorCB) {
    console.log("About to do a find query... ");
    //Asynch 
    eduModel.find({},function(err,docs) {
        console.log("I am inside the find callback... ")
        
        if(err) { 
            console.log("Internal database error in fetching education document ", err);
            errorCB({error:'Internal error occurred, please report...'});
        }
        console.log("got the data from db: ", docs);
        successCB(docs);
    });
    console.log("returning  ");
};
//--------ends--callbackway-----------------//
function getEducation(candidateid, successCB, errorCB)
{
     eduModel.find({ "candidateid": candidateid },'qualification', function(err, educationObject) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(educationObject);
        successCB(educationObject);
    });
};
function addEducation(newEmpObj,candidateID,successCB,errorCB) {
    var addEduObj = new eduModel({
  candidateID:candidateID,
  qualification:[] 
});
    addEduObj.qualification.push(newEmpObj.record[0]);
    addEduObj.save(function(err,res)
    {
         if (err) {
           console.log("Error in saving project: ", err);
           errorCB(err);
       }
       successCB(res);
    });
};
function updateEducation(updatedEmpObj,candidateId,successCB,errCB) {
eduModel.update({ "candidateid": candidateId }, { $push: { "qualification": updatedEmpObj.record[0] } },
       function() {
       successCB("qualification updateded")
   }
);
};
function modifyExistingEducation(candidateID,qualificationID,modifiedExistingObject,successCB,errorCB)
{
    console.log("got",modifiedExistingObject.record[0].title);
    eduModel.update({ 'candidateid': candidateID ,'qualification.title': qualificationID }, 
       {$set: 
        {'qualification.$.title': modifiedExistingObject.record[0].title,
        'qualification.$.batch': modifiedExistingObject.record[0].batch ,
        'qualification.$.from': modifiedExistingObject.record[0].from ,
        'qualification.$.to': modifiedExistingObject.record[0].to,
        'qualification.$.academicType': modifiedExistingObject.record[0].academicType,
        'qualification.$.outcome.result': modifiedExistingObject.record[0].outcome.result,
        'qualification.$.outcome.unit': modifiedExistingObject.record[0].outcome.unit,
        'qualification.$.institute.name': modifiedExistingObject.record[0].institute.name,
        'qualification.$.institute.type': modifiedExistingObject.record[0].institute.type,
        'qualification.$.institute.location': modifiedExistingObject.record[0].institute.location,
        'qualification.$.institute.affiliation': modifiedExistingObject.record[0].institute.affiliation,
        'qualification.$.institute.metadata': modifiedExistingObject.record[0].institute.metadata
       }
     },
       function() {
           successCB("the existing qualification has been modified");
       }
   );
};
function deleteEducation(candidateID,qualificationID,deletingObj,successCB,errorCB)
{
    eduModel.remove({'candidateID':candidateID,'records._id':qualificationID},
        function(){
            successCB("THE EDUCATION DETAIL HAS BEEN DELETED");
        },
        function(){
            errorCB("the education detail failed to be deleted");
        });
};
module.exports = {
    getEducation:getEducation,
    getAllEducation: getAllEducation,
    addEducation: addEducation,
    updateEducation: updateEducation,
    modifyExistingEducation:modifyExistingEducation,
    deleteEducation:deleteEducation
};