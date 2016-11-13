
// let skill = require('.././sectionskill/skillschema');
let projectProcessor = require('.././sectionproject/projectprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');

var getFieldsNames = function() { 
    return ['name','workplace', 'location', 'income', 'skills'];
}  
   
var findProjectInfoMissingFields = function(candidateid, successCB, errorCB) {
   projectProcessor.getProject(candidateid, function(result) {
   	// console.log("------>project info---->",result[0]);
        let projectInfo = result[0];

        let projectFieldArray = getFieldsNames();
        // console.log("----->len"+projectInfo.projects.length);
        let sectionQBoxQuestions = [];
 
        for (let i = 0; i < projectInfo.projects.length; i++) {
        	// console.log("hiii 1");
            let projectData = projectInfo.projects[i];

            for (let j = 0; j < projectFieldArray.length; j++) {
            	// console.log("--->hii  2");
                if (projectData[projectFieldArray[j]] == '') {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: "project",
                        fieldname: projectFieldArray[j],
                        instancename: projectData.name
                    });
                    //let it be the defualt, which is assumed to be pending
                    //let it be the defualt, which is assumed to be empty
                    sectionQBoxQuestions.push(qboxquestion);
                    // console.log("----->"+qboxquestion);      
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
    findProjectInfoMissingFields: findProjectInfoMissingFields
};
