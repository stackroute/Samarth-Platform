const neo4j = require('neo4j');
let neo4jConnection = require('../connections/neo4jconnection.js');
console.log(neo4jConnection);
const db = neo4jConnection.getConnection();

applyJob = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) merge (n)-[r:applied]->(j) return type(r) as status',
			params:{
				candidateid:req.candidateid,
				jobcode:req.jobcode
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
			query:'match (n:Candidate)-[r:applied]->(j:Job{name:{jobcode}}) return distinct n.name as candidates',
			params:{
				jobcode:req.params.jobcode
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
			query:'match (n:Candidate{name:{candidateid}})-[r:applied]->(j:Job) return distinct j.name as jobs',
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

accept = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) merge p=(j)-[r:accepted]->(n) return type(r) as status',
			params:{
				candidateid:req.params.candidateid,
				jobcode:req.params.jobcode
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

status = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}})-[r]->(j:Job{name:{jobcode}})  return distinct type(r) as status',
			params:{
				candidateid:req.candidateid,
				jobcode:req.jobcode
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

reject = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) merge p=(j)-[r:rejected]->(n) return type(r) as status',
			params:{
				candidateid:req.params.candidateid,
				jobcode:req.params.jobcode
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

module.exports = {
	applyJob:applyJob,
	appliedCandidates:appliedCandidates,
	appliedJobs:appliedJobs,
	accept:accept,
	reject:reject,
	status:status
}
