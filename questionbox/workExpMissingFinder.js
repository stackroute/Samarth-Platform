
// let skill = require('.././sectionskill/skillschema');
let workProcessor = require('./../sectionworkexperiance/workprocessor');
// let workProcessor = require('./../sectionworkexperiance/workprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');

var getFieldsNames = function() { 
    return ['from','to', 'duration'];
}   
    
var findWorkMissingFields = function(candidateid, successCB, errorCB) {
   workProcessor.getworkexp(candidateid, function(result) {
   	// console.log("------>workexperience---->");
    console.log(result[0]);
        let workInfo = result[0];

        let workFieldArray = getFieldsNames();
        // console.log("----->len"+projectInfo.projects.length);
        let sectionQBoxQuestions = [];
 
        for (let i = 0; i < workInfo.workexperience.length; i++) {
        	// console.log("hiii 1");
            let workData = workInfo.workexperience[i];
            console.log('workData');
            console.log(workData);

            for (let j = 0; j < workFieldArray.length; j++) {
            	// console.log("--->hii  2");
                if (workData.duration[workFieldArray[j]] == "" || workData.duration[workFieldArray[j]] == null || workData.duration[workFieldArray[j]]== undefined) {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: "workexperience",
                        fieldname: workFieldArray[j],
                        instancename: workData.designation
                    });
                    //let it be the defualt, which is assumed to be pending
                    //let it be the defualt, which is assumed to be empty
                    sectionQBoxQuestions.push(qboxquestion);
                    console.log(sectionQBoxQuestions); 
                    console.log(sectionQBoxQuestions.length); 

                }
            } //end of looping through each field
        } // end of iterating through all the skills of the candiate 

 
        if (sectionQBoxQuestions.length > 0) {
            //insert to DB
            // qboxprocessor.insertPendindData(sectionQBoxQuestions,
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
    findWorkMissingFields: findWorkMissingFields
};
