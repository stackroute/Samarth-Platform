let mongoose = require('mongoose');
let skill = require('./skillschema');

 
function getSkill(candidateid, successCB, errorCB) {
	skill.find({
		candidateid: candidateid
	}, function(err, skill) {
		if (err) {
			errorCB(err);

		} 
		successCB(skill);
	});
}

function getallSkill(successCB, errorCB) {
	// This is a asynch op
	// Go to DB and fetch record for specified empid

	let skillMap = {};
	skill.find({}, function(err, skills) {
		if (err) {
			errorCB(err);
		}
		skills.forEach(function(skill) {
			skillMap[skill._id] = skill;
		});
		successCB(skills);
	});
}

// add skill for the first time when no records are present by creating records
function createNewSkill(formobj, sucessCB, errorCB) {
	let skillObj = new skill({
		candidateid: formobj.mobile,
		skills: []
	});

	skillObj.save(function(err, result) {
		if (err) {
			errorCB(err);
		}
		sucessCB(result);

		// Asynch method
		// Save empObj to DB
	});
}
 
//add skills after  entering into the question box into the existing records
function addMissingSkillFieldResponse(candidateid, skillInstanceName, fieldname, response, successCB, errorCB) {
   console.log("------->"+skillInstanceName+"   "+fieldname+"  "+response);
	let field = ('skills.$.' + fieldname);
	let setObj = {};
	setObj[field] = response;

	skill.update({
			candidateid: candidateid,
			'skills.skillname': skillInstanceName
		}, {
			$set: setObj
		},
		function(err, result) {
			if (err) {}
			successCB(result)
		console.log("------>result for skills--->"+result);
		}

	);
}

// add skills into the existing records
function addSkill(skillObj, candidateid, sucessCB ) {
	skill.update({
			candidateid: candidateid
		}, {
			$push: {
				skills: skillObj.skills[0]
			}
		},
		function() {
			sucessCB(skillObj.skills[0].skillname, candidateid);
		}
	);
}

// , errorCB
function updateSkill(skillname, skillobj, candidateid, sucessCB) {
	skill.update({
			candidateid: candidateid,
			'skills.skillname': skillname
		}, {
			$set: {
				'skills.$.skillname': skillobj.skills[0].skillname,
				// 'skills.$.category': skillobj.skills[0].category,
				'skills.$.expertise': skillobj.skills[0].expertise,
				'skills.$.experience': skillobj.skills[0].experience,
				'skills.$.metadata': skillobj.skills[0].metadata
			}
		},
		function() {
			sucessCB('skill updated');
		}

	);
}
// , errorCB
function deleteASkill(skillname, candidateid, sucessCB) {
	skill.update({
		candidateid: candidateid,
		'skills.skillname': skillname
	}, {
		$pull: {
			skills: {
				skillname: skillname
			}
		}
	}, function() {
		sucessCB(skillname, candidateid);
	});
}
// , errorCB
function deleteSkill(candidateid, sucessCB) {
	skill.update({
		candidateid: candidateid,
		'skills.skillname': skillname
	}, {
		$pullAll: {
			skills: {
				skillname: skillname
			}
		}
	}, function() {
		sucessCB('skill object deleted');
	});
}

module.exports = {
	getSkill: getSkill,
	createNewSkill: createNewSkill,
	getallSkill: getallSkill,
	addMissingSkillFieldResponse: addMissingSkillFieldResponse,
	addSkill: addSkill,
	updateSkill: updateSkill,
	deleteASkill: deleteASkill,
	deleteSkill: deleteSkill
};
