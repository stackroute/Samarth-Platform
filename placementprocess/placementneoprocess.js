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


candidatesOfProfession = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH (n:Profession{name:{profession}})-[r:working_as]-(c:Candidate) RETURN distinct c.name as candidateid',
			params:{
				profession:req.params.profession
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
			query:'MATCH p=(c:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) optional match (c)<-[r:rejected]-(j) DELETE r merge (c)<-[r2:accepted]-(j) return distinct type(r2)',
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

status = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) optional match (n)-[r:applied]->(j) return distinct n.name as candidateid,j.name as jobcode,type(r) as status',
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

acceptedDetails = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH p=(c:Candidate{name:{candidateid}})<-[r:accepted]-(j) RETURN distinct j.name as jobcode',
			params:{
				candidateid:req.params.candidateid
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

acceptedCandidates = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH p=(c:Candidate)<-[r:accepted]-(j:Job{name:{jobcode}}) RETURN distinct c.name as candidateid',
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

joinedCandidates = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH p=(c:Candidate)-[r:join]-(j:Job{name:{jobcode}}) RETURN distinct c.name as candidateid',
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

declinedCandidates = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH p=(c:Candidate)-[r:decline]-(j:Job{name:{jobcode}}) RETURN distinct c.name as candidateid',
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

rejectedCandidates = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'MATCH p=(c:Candidate)<-[r:rejected]-(j:Job{name:{jobcode}}) RETURN distinct c.name as candidateid',
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

join = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) merge p=(j)<-[r:join]-(n) return type(r) as status',
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

decline = function(req,successCB,errorCB)
{
	try
	{
		db.cypher({
			query:'match (n:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) merge p=(j)<-[r:decline]-(n) return type(r) as status',
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
			query:'MATCH p=(c:Candidate{name:{candidateid}}),(j:Job{name:{jobcode}}) optional match (c)<-[r:accepted]-(j) DELETE r merge (c)<-[r2:rejected]-(j) return distinct type(r2)',
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

module.exports = {
	applyJob:applyJob,
	appliedCandidates:appliedCandidates,
	appliedJobs:appliedJobs,
	accept:accept,
	reject:reject,
	status:status,
	acceptedDetails:acceptedDetails,
	join:join,
	decline:decline,
	candidatesOfProfession:candidatesOfProfession,
	acceptedCandidates:acceptedCandidates,
	rejectedCandidates:rejectedCandidates,
	joinedCandidates:joinedCandidates,
	declinedCandidates:declinedCandidates

}
