let educationprocessor = require('.././sectioneducation/educationprocessor');
let qboxprocessor = require('./qboxprocessor');
let qboxquestionModel = require('./qboxquestions');

var getFieldsNames = function() {
    // return ['from', 'to', 'academicType','type','location','affiliation', 'result', 'unit'];
    return ['from', 'to', 'outcome','institute'];
}

// let generateQues = function(candidateid, fieldname, instancename){
//     console.log(fieldname, instancename);
//     let qboxquestion = new qboxquestionModel({
//                         candidateid: candidateid,
//                         section: "qualification",
//                         fieldname: fieldname,
//                         instancename: instancename
//                     });
//         return qboxquestion;
//                     //sectionQBoxQuestions.push(qboxquestion);
// }
var findMissingEducationFields = function(candidateid) {
    educationprocessor.getEducation(candidateid, function(result) {
        // console.log("------->result in education--------->" + result[0]);
        let candidateEducationDetails = result[0];
            console.log("the length is ");
            console.log(result);
        let educationFieldArray = getFieldsNames();
        // let eduProps = ['affiliation', 'location', 'type', 'unit', 'result'];
        // let outcomeProps = [];

        let sectionQBoxQuestions = [];
        // console.log("candidate education details"+ candidateEducationDetails);
        //candidateEducationDetails.qualification.length
        // console.log(candidateEducationDetails.qualification.length);
        for (let i = 0; i < candidateEducationDetails.qualification.length; i++) {

            let educationData = candidateEducationDetails.qualification[i];
            // console.log("while iterating");
            // console.log(educationFieldArray.length);


            for (let j = 0; j < educationFieldArray.length; j++) {
                // console.log("while iterating");
                      // console.log(educationData[educationFieldArray[j]] instanceof Object );
                // if (educationData[educationFieldArray[j]] instanceof Object) {
                //     let eduProps = Object.keys(educationData[educationFieldArray[j]]);
                //     console.log(eduProps);
                //     for (let k = 0; k < eduProps.length; k++) {
                //         console.log(educationData[educationFieldArray[j]].eduProps[k]);
                //         if (educationData[educationFieldArray[j]].eduProps[k] == undefined || educationData[educationFieldArray[j]].eduProps[k] == ''){
                //         sectionQBoxQuestions.push(generateQues(candidateid, eduProps[j], educationData.title));
                //     }
                //     }
                // }
                // else if (educationData[educationFieldArray[j]] === 'outcome') {
                //     for (let k = 0; k < outcomeProps.length; k++) {
                //         sectionQBoxQuestions.push(generateQues(candidateid, educationFieldArray[j], educationData.title));
                //     }
                // }
                // else if (educationData[educationFieldArray[j]] == undefined || educationData[educationFieldArray[j]] == '') {
                if (educationData[educationFieldArray[j]] == undefined || educationData[educationFieldArray[j]] == '') {
                   // sectionQBoxQuestions.push(generateQues(candidateid, educationFieldArray[j], educationData.title));
                    let qboxquestion = new qboxquestionModel({
                        candidateid: candidateid,
                        section: "qualification",
                        fieldname: educationFieldArray[j],
                        instancename: educationData.title
                    });

                    sectionQBoxQuestions.push(qboxquestion);
                    console.log("----->" + qboxquestion);
                }
            } //end of looping through each field
        } // end of iterating through all the qualifications of the candiate 


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
