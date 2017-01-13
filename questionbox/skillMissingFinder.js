// let skill = require('.././sectionskill/skillschema');
let skillProcessor = require('.././sectionskill/skillprocessor.js');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');
 
var getFieldsNames = function() {
    return ['skillname', 'expertise', 'experience'];
} 
 
var findMissingFields = function(candidateid, successCB, errorCB) {
    skillProcessor.getSkill(candidateid, function(result) {
        let candidateSkills = result[0];
        let skillFieldArray = getFieldsNames();
        console.log(skillFieldArray);
        let sectionQBoxQuestions = [];
 
        for (let i = 0; i < candidateSkills.skills.length; i++) {

            let skillData = candidateSkills.skills[0];
            console.log(skillData);
            for (let j = 0; j < skillFieldArray.length; j++) {

                if (skillData[skillFieldArray[j]] == undefined) {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: "skills",
                        fieldname: skillFieldArray[j],
                        instancename: skillData.skillname
                    });
                    //let it be the defualt, which is assumed to be pending
                    //let it be the defualt, which is assumed to be empty
                    sectionQBoxQuestions.push(qboxquestion);
                    console.log("----->"+qboxquestion);      
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
    findMissingFields: findMissingFields
};
