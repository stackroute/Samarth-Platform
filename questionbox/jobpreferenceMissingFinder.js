let jobpreferenceProcessor = require('.././sectionjobpreferences/jobpreferencesprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');
 
var getFieldsNames = function() { 
    return ['expected_salary','engagement_type','joining_date'];
}  
    console.log("heloooooooooooooo");
   
var findJobInfoMissingFields = function(candidateid, successCB, errorCB) {
    jobpreferenceProcessor.getPreferences(candidateid, function(result) {
        console.log("result is");
        console.log(result[0]);
        let jobInfo = result[0];
         
        let infoFieldArray = getFieldsNames();

        let sectionQBoxQuestions = [];
 
        let jobInfoData = jobInfo;
            console.log("-----jobInfoData--------->"+ jobInfoData)
       

            for (let j = 0; j < infoFieldArray.length; j++) {
      
                if (jobInfoData[infoFieldArray[j]] == '' || jobInfoData[infoFieldArray[j]] == null ) {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: 'jobpreference',
                        fieldname: infoFieldArray[j],
                        instancename: " "
                    });
                    console.log('-----------------candidatepreferences------------');
                    sectionQBoxQuestions.push(qboxquestion);
                    console.log(sectionQBoxQuestions);
               
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
    findJobInfoMissingFields: findJobInfoMissingFields
};