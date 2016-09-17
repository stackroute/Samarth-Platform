var mongoose = require('mongoose');

var skill = require("./skillschema");


function getSkill(candidateid, successCB, errorCB) {

    //This is a asynch op
    //Go to DB and fetch record for specified empid

    skill.find({ "candidateid": candidateid },'skills', function(err, skill) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log(skill);
        successCB(skill);
    });
}

function getallSkill(successCB, errorCB) {

    //This is a asynch op
    //Go to DB and fetch record for specified empid

    var skillMap = {};
    skill.find({}, function(err, skills) {
        if (err) {
            console.log(err);
            errorCB(err);
        }
        skills.forEach(function(skill) {
            skillMap[skill._id] = skill;
        });
        console.log(skills);
        successCB(skills);
    });
}

//add skill for the first time when no records are present by creating records
function createNewSkill(newskillobj, candidateid, sucessCB, errorCB) {
    var skillObj = new skill({
        skills: []
    });
    skillObj.skills.push(newskillobj.skills[0]);
    console.log("inside createNewSkill:");

    skillObj.save(function(err, result) {
        console.log("inside save");
        if (err) {
            console.log(err);
            errorCB(err);
        }
        console.log('New Skill created', result);
        sucessCB(result);


        //Asynch method
        //Save empObj to DB

    });
}

//add skills into the existing records
function addSkill(skillObj, candidateid, sucessCB, errorCB) {
    skill.update({ "candidateid": candidateid }, { $push: { "skills": skillObj.skills[0] } },
        function() {
            // console.log("successfully added to ",doc);
            sucessCB("skill added")
        }
    );
}


function updateSkill(skillname,skillobj, candidateid, sucessCB, errorCB) {
    skill.update({ 'candidateid': candidateid ,'skills.skillname': skillname }, 
        {'$set': 
        { 
         'skills.$.skillname': skillobj.skills[0].skillname,
         'skills.$.category': skillobj.skills[0].category,
         'skills.$.expertise': skillobj.skills[0].expertise ,
         'skills.$.experience': skillobj.skills[0].experience ,
         'skills.$.metadata': skillobj.skills[0].metadata }},
        function() {
            sucessCB("skill updated");
        }

    );
}
function deleteASkill(skillname,candidateid, sucessCB, errorCB) {
     skill.update({'candidateid': candidateid,'skills.skillname':skillname }, 
        { $pull  : { 'skills':{'skillname':skillname}}}, function(){
    // console.log('affected: ', affected);
    sucessCB("skill object deleted");
});
}

function deleteSkill(candidateid, sucessCB, errorCB) {
     skill.update({'candidateid': candidateid,'skills.skillname':skillname }, 
        { $pullAll  : { 'skills':{'skillname':skillname}}}, function(){
    // console.log('affected: ', affected);
    sucessCB("skill object deleted");
});
}

module.exports = {
    getSkill: getSkill,
    createNewSkill: createNewSkill,
    getallSkill: getallSkill,
    addSkill: addSkill,
    updateSkill: updateSkill,
    deleteSkill:deleteSkill
};
