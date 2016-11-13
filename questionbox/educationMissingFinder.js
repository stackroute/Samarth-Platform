let educationprocessor = require('.././sectioneducation/educationprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');

var getFieldsNames = function() {
    return ['title', 'batch', 'academicType'];
}

var findMissingEducationFields = function(candidateid) {
    educationprocessor.getEducation(candidateid, function(result) {
        // console.log("------->result in education--------->" + result[0]);
        let candidateEducationDetails = result[0];

        let educationFieldArray = getFieldsNames();

        let sectionQBoxQuestions = [];
        //candidateEducationDetails.qualification.length
        for (let i = 0; i < candidateEducationDetails.qualification.length; i++) {

            let educationData = candidateEducationDetails.qualification[i];


            for (let j = 0; j < educationFieldArray.length; j++) {
                if (educationData[educationFieldArray[j]] == undefined) {
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: "qualification",
                        fieldname: educationFieldArray[j],
                        instancename: educationData.title
                    });

                    sectionQBoxQuestions.push(qboxquestion);
                    // console.log("----->" + qboxquestion);
                }
            } //end of looping through each field
        } // end of iterating through all the skills of the candiate 


        if (sectionQBoxQuestions.length > 0) {
            qboxprocessor.createNewQuestionColln(sectionQBoxQuestions,
                function(result) {
                    // console.log("---->res" + result);
                    // successCB(sectionQBoxQuestions);
                },
                function(err) {

                });

            //call qboxprocessor to insert these questions
        }
    }, function(err) {
        console.log("Error in finding missing fields for particular candidate ", err);
        errorCB(err);
    }); //end of get education processor find method
}

module.exports = {
    getFieldsNames: getFieldsNames,
    findMissingEducationFields: findMissingEducationFields
};
