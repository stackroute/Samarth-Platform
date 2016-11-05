    // var skillProcessor = require('./skillprocessor');
    let skill = require('.././sectionskill/skillschema');
    let qboxProcessor = require('./qboxprocessor.js');
    let keyArray = {};
    let key1 = [];
    let val1 = [];
    let k = 0;
    // keys and values retrieving from loadCache which is in
    // fieldQCache file
    let questions = function(key, value) {
            keyArray = { key: value };
            for (let i in keyArray) {
                let val = keyArray.key;
                 key1[k] = key;
                val1[k] = val;
                k++;
            }
        }; // end question fxn

    // finding the missing fields in skills
    let SkillMissingFields = function(body, candidateid) {
            let skillsKeys = [];
            let skillQuery = [];
            let SkillsEmptyFieldQuery = [];
            var k = 0;
            // retrieving only those keys which is for skills
            for (var i = 0; i < key1.length; i++) {
                if (key1[i].includes('skills')) {
                    skillsKeys[k] = key1[i];
                    skillQuery[k] = val1[i];
                    k++;
                }
            }

            // recieve req body
            let skillData = body.skills[0];
            let emptyFields = [];
            var j = 0;
            var k = 0;
            for (var i in skillData) {
                let key = i;
                let val = skillData[i];
                k++;

                for (var j = 0; j < skillsKeys.length; j++) {
                    if (skillsKeys[j].includes(key)) {
                        skillsKeys[j] = ' ';
                        skillQuery[j] = ' ';
                    }
                }
            } // end for loop
            var j = 0;
            // checking which fields are missing
            for (var k = 0; k < skillsKeys.length; k++) {
                if (!skillsKeys[k].includes(' ')) {
                    // @TODO ==========================================================
                    // call function from qboxquestionProcessor to isnart into database
                    let fieldname = skillsKeys[k].substring(skillsKeys[k].indexOf('skills')).split('_')[1];
                    let newquestionobj = {
                        section: 'skills',
                        fieldname: fieldname,
                        instancename: body.skills[0].skillname,
                        response: ' ',
                        status: 'pending'
                    };

                    console.log('question object --------->', newquestionobj);
                    qboxProcessor.createNewQuestions(newquestionobj, candidateid, function(result) {
                        console.log('Result from Suucess ------->', result);
                    }, function(error) {
                        console.log('Result from error', error);
                    });

                    // ===================================================================


                    SkillsEmptyFieldQuery[j] = skillQuery[k];
                    j++;
                }
            }
            // console.log(emptyFieldQuery);

            return SkillsEmptyFieldQuery;
        }; // end skill missing fields
    let EducationMissingFields = function(body, candidateid) {
        console.log('------------------------------------------------------------------------>');
        console.log(body);
         let educationKeys = [];
            let educationQuery = [];
            let educationEmptyFieldQuery = [];
            let k = 0;
            for (let i = 0; i < key1.length; i++) {
                if (key1[i].includes('skills')) {
                    educationKeys[k] = key1[i];
                    educationQuery[k] = val1[i];
                    k++;
                }
            }
        // console.log(body);
        // var i = 0;
        // var k = 0;
        // // console.log("------------------------------body------------------");
        // var fields = {
        //     title: body.qualification[0].title,
        //     academicType: body.qualification[0].academicType,
        //     batch: body.qualification[0].batch,
        //     result: body.qualification[0].outcome.result,
        //     unit: body.qualification[0].outcome.unit,
        //     name: body.qualification[0].institute.name,
        //     type: body.qualification[0].institute.type,
        //     affiliation: body.qualification[0].institute.affiliation,
        //     location: body.qualification[0].institute.location
        // };
        // var tempArray = [];
        // var fieldsName = ["title", "academicType", "batch",
        //     "result", "unit", "name",
        //     "type", "affiliation", "location"
        // ];
        // var arrayFields = [fields.title, fields.academicType, fields.batch,
        //     fields.result, fields.unit, fields.name,
        //     fields.type, fields.affiliation, fields.location
        // ];
        // for (i = 0; i < arrayFields.length; i++) {
        //     if (arrayFields[i] == null) {
        //         console.log(k);
        //         tempArray[k] = fieldsName[i];
        //         k++;

        //     } //end if

        // } //end for
        // return tempArray;
    };// end education missing fields
    let WorkMissingFields = function() {
        return 'work';
    };
    let PersonalInfoMissingFields = function() {
        return 'info';
    };
    let ProjectMissingFields = function() {
        return 'project';
    };
    module.exports = {
        questions: questions,
        SkillMissingFields: SkillMissingFields,
        EducationMissingFields: EducationMissingFields,
        WorkMissingFields: WorkMissingFields,
        PersonalInfoMissingFields: PersonalInfoMissingFields,
        ProjectMissingFields: ProjectMissingFields
    };
