let jobpreferenceProcessor = require('.././sectionjobpreferences/jobpreferencesprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');
 
var getFieldsNames = function() { 
    return ['dob', 'gender', 'maritialstatus','mothertongue','email','contact','address','location','pincode','profile'];
}  
   
var findPersonalInfoMissingFields = function(candidateid, successCB, errorCB) {
    jobpreferenceProcessor.getPreferences(candidateid, function(result) {
        let jobInfo = result[0];
         
        let infoFieldArray = getFieldsNames();

        let sectionQBoxQuestions = [];
 
            let jobInfoData = jobInfo;
            console.log("-----jobInfoData--------->"+ jobInfoData)
       

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