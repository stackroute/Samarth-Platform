let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();
 

let skillRelationBuilder = function(skill, candidateid, errCB) {
	//console.log("*****************from skillRelationBuilder",candidateid);
	//console.log("*****************from skillRelationBuilder",skill);
 
  
	db.cypher({
	 query:'MERGE(c:Candidate{name:{candidateid}})MERGE(sk:Skill{name:{skillname}})MERGE(c)-[r:KNOWS]->(sk)',
		params: {
			candidateid: candidateid,
			skillname: skill
		}
	}, function(err, results) {
		if (err){
			errCB(err, null);
		}
		 else {
			errCB(null, results);
		}
	}
	);
};

// Delete relation from neo4j,only relation is deleted as skill node is related to other candidate nodes

let skillRelationDelete = function(skill, candidateid, errCB) {
	db.cypher({
	 query:'MATCH(c:Candidate {name:{candidateid}})-[r:KNOWS]->(sk:Skill {name:{skillname}}) DETACH DELETE r',
		params: {
			candidateid: candidateid,
			skillname: skill
		}
	}, function(err, results) {
		if (err){
			errCB(err, null);
		}
		 else {
			errCB(null, results);
		}
	}
	);
};

module.exports = {
	skillRelationBuilder: skillRelationBuilder,
	skillRelationDelete: skillRelationDelete
};
