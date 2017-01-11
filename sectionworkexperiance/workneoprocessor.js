let neo4j = require('neo4j');
let neo4jConnection = require("../connections/neo4jconnection.js");
let relationConfig = require("../relationConfig/relationconfig");

console.log(relationConfig.neorelationconfig()['IS_A']);

let db = neo4jConnection.getConnection();


let DesignationRelationBuilder = function(designation , workplace , location , candidateid, errCB) {
	//console.log("*****************from skillRelationBuilder",candidateid);
	//console.log("*****************from skillRelationBuilder",skill);


	db.cypher({
	 query:'MERGE(c:Candidate{name:{candidateid}})MERGE(rl:Role{name:{designation} , employer:{employer},location:{location}})MERGE(c)-[r:'+relationConfig.neorelationconfig()['IS_A']+']->(rl)',
		params: {
			candidateid: candidateid,
			designation: designation,
			employer: workplace,
			location: location
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

//workexpRelationDelete deletes the relation from NEO for the corresponding candidateid
let workexpRelationDelete = function(designation , candidateid, errCB) {
	db.cypher({
	 query:'MATCH(c:Candidate {name:{candidateid}})-[r:IS_A]->(rl:Role{name:{designation}}) DETACH DELETE r',
		params: {
			candidateid: candidateid,
			designation: designation
			
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
}; //end workexpRelationDelete



module.exports = {
	DesignationRelationBuilder: DesignationRelationBuilder,
	workexpRelationDelete: workexpRelationDelete
	
};

