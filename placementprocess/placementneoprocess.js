const neo4j = require('neo4j');
let neo4jConnection = require('../connections/neo4jconnection.js');
console.log(neo4jConnection);
const db = neo4jConnection.getConnection();

applyJob = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'merge (n:Candidate{name:{candidateid}})-[r:applied]->(j:Job{name:{jobname}}) return type(r) as status',
			params:{
				candidateid:req.candidateid,
				jobname:req.jobname
			}
		},
		function(err,result)
		{
			if(err)
			{
				errorCB(err);
			}
			else
			{
				successCB(result);
			}
		}
		)
	}
	catch(err)
	{
		console.log(err);
	}
}

appliedCandidates = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate)-[r:applied]->(j:Job{name:{jobname}}) return n.name as candidates',
			params:{
				jobname:req.params.jobname
			}
		},
		function(err,result)
		{
			if(err)
			{
				errorCB(err);
			}
			else
			{
				successCB(result);
			}
		}
		)
	}
	catch(err)
	{
		console.log(err);
	}
}

appliedJobs = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate)-[r:applied]->(j:Job) return distinct j.name as jobs',
			params:{
				candidateid:req.params.candidateid
			}
		},
		function(err,result)
		{
			if(err)
			{
				console.log(err);
				errorCB(err);
			}
			else
			{
				successCB(result);
			}
		}
		)
	}
	catch(err)
	{
		console.log(err);
	}
}


module.exports = {
	applyJob:applyJob,
	appliedCandidates:appliedCandidates,
	appliedJobs:appliedJobs
}