let async = require('async');
let profileConstants = require('./profileConstants');

// Personal Info validator

let personalInfoValidation = function(profile){
	// console.log("personalInfoValidation called ...................");
  return function(personalinfoCallback) {
  let personalinfoobj = { };
  let obj=[];
  if(profile[profileConstants.projectobj.name] === undefined || profile[profileConstants.projectobj.name] === ''){
    obj.push({ name : 'Candidate name is missing'});
  }
  if(profile[profileConstants.projectobj.email] === undefined || profile[profileConstants.projectobj.email] === ''){
    obj.push({ email : 'Candidate email is missing'});
  }
   if(profile['mobile'] === undefined || profile['mobile'] === ''){
    obj.push({ contact : 'Candidate contact is missing'});
  }
  personalinfoobj.personalInfoResults = obj;
  personalinfoCallback(null, personalinfoobj);
}
}

// Skills validator

let skillsValidation = function(skills){
	// console.log("skillsValidation called ...................");

return function(skillCallback) {
  let skillsValResults = {};
  let skillsObj=[];
  skills.forEach(function(skill){
    let result = skillValidation(skill);
    if(result.error){
      skillsObj.push(result);
    }
  });
  skillsValResults.skillsResults = skillsObj;
    skillCallback(null, skillsValResults);
}

}

// Qualifications validator

let qualificationsValidation = function(qualifications){
	// console.log("qualificationsValidation called ...................");
	return function(qualificationCallback) {
  
     let valResults = {};
  let obj=[];
  qualifications.forEach(function(qualification){
    let result = qualificationValidation(qualification);
    if(result.error){
   
    obj.push(result);
    }
  });
  valResults.qualificationsResults = obj;
    qualificationCallback(null, valResults);
  }
}

// Projects validator

let projectsValidation = function(projects){
	// console.log("projectsValidation called ...................");
	return function(projectCallback) {
  
  let valResults = {};
  let obj=[];
  projects.forEach(function(project){
    let result = projectValidation(project);
    if(result.error){
   
    obj.push(result);
    }
  });
  valResults.projectsResults = obj;
    projectCallback(null, valResults);
  }
}

// Work Experiences validator

let workExperiencesValidation = function(workExperiences){
	// console.log("workExperiencesValidation called ...................");
	return function(workExperienceCallback) {
  
  let valResults = {};
  let obj=[];
  workExperiences.forEach(function(workExperience){
    let result = workExperienceValidation(workExperience);
    if(result.error){
   
    obj.push(result);
    }
  });
  valResults.workExperiencesResults = obj;
    workExperienceCallback(null, valResults);
  }
}

// Skill validator

let skillValidation = function(skill, callback){
	let err = false;
  let message = 'Skill info is provided';
	if(skill[profileConstants.projectobj.skillname] === undefined || skill[profileConstants.projectobj.skillname] === ''){
		err = true;
    message = 'Skill name is missing';
	}
  let result = {
    error : err,
    message : message
  }
		
	return result;
}

// Qualification validator

let qualificationValidation = function(qualification){
	let err = false;
  let message = {};
  if(qualification[profileConstants.projectobj.title] === undefined || qualification[profileConstants.projectobj.title] === ''){
    err = true;
    message.title = 'Qualification title is missing';
  }
  if(qualification[profileConstants.projectobj.batch] === undefined || qualification[profileConstants.projectobj.batch] === ''){
    err = true;
    message.batch = 'Qualification batch is missing';
  }
  if(qualification[profileConstants.projectobj.institute] === undefined || qualification[profileConstants.projectobj.institute].name === ''){
    err = true;
    message.instituteName = 'Institute name is missing';
  }
  if(qualification[profileConstants.projectobj.outcome] === undefined || qualification[profileConstants.projectobj.outcome].result === ''){
    err = true;
    message.result = 'Qualification result is missing';
  }
  let result = {
    error : err,
    message : message
  }
  return result;
}

// Project validator

let projectValidation = function(project){
	let err = false;
  let message = {};
  if(project[profileConstants.projectobj.name] === undefined || project[profileConstants.projectobj.name] === ''){
    err = true;
    message.name = 'Project name is missing';
  }
  if(project[profileConstants.projectobj.location] === undefined || project[profileConstants.projectobj.location] === ''){
    err = true;
    message.location = 'Project location is missing';
  }
  if(project[profileConstants.projectobj.skills] === undefined || project[profileConstants.projectobj.skills].length === 0){
    err = true;
    message.skills = 'Project skills are missing';
  }
  if(project[profileConstants.projectobj.role] === undefined || project[profileConstants.projectobj.role] === ''){
    err = true;
    message.role = 'Project role is missing';
  }
  let result = {
    error : err,
    message : message
  }
  return result;
}

// Work Experience validator

let workExperienceValidation = function(workExperience){
	let err = false;
  let message = {};
  if(workExperience[profileConstants.projectobj.designation] === undefined || workExperience[profileConstants.projectobj.designation] === ''){
    err = true;
    message.designation = 'Work experience designation is missing';
  }
  if(workExperience[profileConstants.projectobj.workplace] === undefined || workExperience[profileConstants.projectobj.workplace] === ''){
    err = true;
    message.workplace = 'Work experience workplace is missing';
  }
  if(workExperience[profileConstants.projectobj.skills] === undefined || workExperience[profileConstants.projectobj.skills].length === 0){
    err = true;
    message.skills = 'Work experience skills are missing';
  }
  if(workExperience['Location'] === undefined || workExperience['Location'] === ''){
    err = true;
    message.location = 'Work experience location is missing';
  }
  let result = {
    error : err,
    message : message
  }
  return result;
}

module.exports = {
	personalInfoValidation : personalInfoValidation,
	skillsValidation : skillsValidation,
	qualificationsValidation : qualificationsValidation,
	projectsValidation : projectsValidation,
	workExperiencesValidation : workExperiencesValidation
};