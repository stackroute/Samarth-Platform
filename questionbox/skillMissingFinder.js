let mongoose = require('mongoose');
let skill = require('.././sectionskill/skillschema');
let skillProcessor = require('.././sectionskill/skillprocessor.js');
let qboxprocessor = require('./qboxprocessor');
var getFieldsNames = function() {
    return ['skillname', 'category', 'expertise', 'experience'];
}
 
var findMissingFields = function(candidateid, successCB, errorCB) {
    skillProcessor.getSkill(candidateid, function(result) {
       let candidateSkills = result[0];

        let skillFieldArray = getFieldsNames();

        let sectionQBoxQuestions = [];

        for (let i = 0; i < candidateSkills.skills.length; i++) {

            let skillData = candidateSkills.skills[i];

            for (let j = 0; j < skillFieldArray.length; j++) {

                if (skillData[skillFieldArray[j]] == undefined) {
                	let qboxquestion = {}; 
                    qboxquestion["candidateid"] = candidateid;
                    qboxquestion["section"] = "skills";
                    qboxquestion["fieldname"] = skillFieldArray[j];
                    qboxquestion["instancename"] = skillData.skillname;
                    qboxquestion["response"] = undefined;
                    qboxquestion["status"] = "pending"; //let it be the defualt, which is assumed to be pending
                    //let it be the defualt, which is assumed to be empty
                    sectionQBoxQuestions.push(qboxquestion);
                    // console.log("----->"+qboxquestion);		
                }  
            } //end of looping through each field
        }// end of iterating through all the skills of the candiate 
 
        // console.log("sectionQBoxQuestions----->",sectionQBoxQuestions);

        if(sectionQBoxQuestions.length > 0) {
        	//insert to DB
        	qboxprocessor.insertPendindData(sectionQBoxQuestions,
        		function(result)
        		{
        			console.log("--------->result from the qbox question------------->"+result);
        		},
        		function(err)
        		{
        			console.log("--------->error from the qbox question------------->"+err);
        		});
    		//console.log("------->array after pushing------->", sectionQBoxQuestions[0]);
    		//call qboxprocessor to insert these questions
    		successCB(sectionQBoxQuestions);
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
