// let skill = require('.././sectionskill/skillschema');
let personalInfoProcessor = require('.././sectionpersonalinfo/personalinfoprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');
 
var getFieldsNames = function() { 
    return ['name','dob', 'gender', 'maritialstatus','mothertongue','email','contact','address','location','pincode'];
}  
   
var findPersonalInfoMissingFields = function(candidateid, successCB, errorCB) {
    personalInfoProcessor.getPersonalinfo(candidateid, function(result) {
        let candidateInfo = result[0];
         
        let infoFieldArray = getFieldsNames();

        let sectionQBoxQuestions = [];
 
            let candidateInfoData = candidateInfo;
            console.log("-----candidateInfoData--------->"+ candidateInfoData)
       

            for (let j = 0; j < infoFieldArray.length; j++) {
      
                if (candidateInfoData[infoFieldArray[j]] == '' || candidateInfoData[infoFieldArray[j]] == null) {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: 'personalinfo',
                        fieldname: infoFieldArray[j],
                        instancename: " "
                    });
                    
                    sectionQBoxQuestions.push(qboxquestion);
               
                }
            } //end of looping through each field
       


        if (sectionQBoxQuestions.length > 0) {
            qboxprocessor.createNewQuestionColln(sectionQBoxQuestions,
                function(result) {
                    successCB(sectionQBoxQuestions);
                },
                function(err) {

                });

            //call qboxprocessor to insert these questions
        }
    }, function(err) {
        console.log("Error in finding missing fields for particular candidate ", err);
        errorCB(err);
    });
}

module.exports = {
    getFieldsNames: getFieldsNames,
    findPersonalInfoMissingFields: findPersonalInfoMissingFields
};
