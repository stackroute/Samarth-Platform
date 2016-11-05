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
        if (keyArray.hasOwnProperty(i)) {
            let val = keyArray.key;
            key1[k] = key;
            val1[k] = val;
            k = k + 1;
        }
    }
}; // end question fxn

// finding the missing fields in skills
let SkillMissingFields = function(body, candidateid) {
    let skillsKeys = [];
    let skillQuery = [];
    let SkillsEmptyFieldQuery = [];
    let count = 0;
    let i;
    let j;
    let k2 = 0;
    let j2 = 0;
    // retrieving only those keys which is for skills
    for (i = 0; i < key1.length; i = i + 1) {
        if (key1[i].includes('skills')) {
            skillsKeys[count] = key1[i];
            skillQuery[count] = val1[i];
            count = count + 1;
        }
    }

    // recieve req body
    let skillData = body.skills[0];
    // let emptyFields = [];

    for (let counter in skillData) {
        let key = counter;
        // let val = skillData[counter];
        k2 = k2 + 1;
        for (j = 0; j < skillsKeys.length; j = j + 1) {
            if (skillsKeys[j].includes(key)) {
                skillsKeys[j] = ' ';
                skillQuery[j] = ' ';
            }
        }
    } // end for loop

    // checking which fields are missing
    for (let k1 = 0; k1 < skillsKeys.length; k1 = k1 + 1) {
        if (!skillsKeys[k1].includes(' ')) {
            // @TODO ==========================================================
            // call function from qboxquestionProcessor to isnart into database
            let fieldname =
                skillsKeys[k1].substring(skillsKeys[k1].indexOf('skills')).split('_')[1];
            let newquestionobj = {
                section: 'skills',
                fieldname: fieldname,
                instancename: body.skills[0].skillname,
                response: ' ',
                status: 'pending'
            };
          //  console.log('question object --------->', newquestionobj);
            qboxProcessor.createNewQuestions(newquestionobj, candidateid, function(result) {
                // console.log("--------->result for pendind fields------->"+result);
            }, function(error) {

            });
            SkillsEmptyFieldQuery[j2] = skillQuery[k1];
            j2 = j2 + 1;
        }
    }
    // console.log(emptyFieldQuery);

    return SkillsEmptyFieldQuery;
}; // end skill missing fields
let EducationMissingFields = function() {
    return 'education';
};
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
