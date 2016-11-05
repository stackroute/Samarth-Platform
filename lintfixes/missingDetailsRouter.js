let route = require('express').Router();
// reuire the missingDetailsProcessor.js filein which our
// business logic is defined
let misDetailProcessor = require('./missingDetailsProcessor');

// for skill section
route.post('/:candidateid/check', function(req, res)
{
	try
	{
		let SkillMissingFields = misDetailProcessor.SkillMissingFields(req.body);
		console.log(SkillMissingFields);
	}
	catch(err)
	{
		res.status(500).json({
            error: 'Internal error occurred, please report'
        });
	}
});// end of route.get req
// for education section
route.post('/education/clear/:candidateid', function(req, res)
{
	// req.body.qualification[0].outcome.result
	try
	{
		let EducationMissingFields = misDetailProcessor.EducationMissingFields(req.body);
		console.log(EducationMissingFields);
	}
	catch(err)
	{
		res.status(500).json({
            error: 'Internal error occurred, please report'
        });
	}
});// end of route.get req for education
// for work section
route.post('/work/:candidateid', function(req, res)
{
	console.log('hii m work');
	let a3 = misDetailProcessor.WorkMissingFields();
	console.log(a3);
});// end of route.get req for work
// for personalinfo section
route.get('/personalinfo/:candidateid', function(req, res)
{
	let a4 = misDetailProcessor.PersonalInfoMissingFields();
	console.log(a4);
});// end of route.get req for personalinfo
// for projec section
route.post('/project/:candidateid', function(req, res)
{
	console.log('under project');
	let a5 = misDetailProcessor.ProjectMissingFields();
	console.log(a5);
});// end of route.get req for project
module.exports = route;
