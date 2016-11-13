let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();



createProfessionNode = function(req, res) {
	db.cypher({
		query: 'MERGE(pr:Profession {name:{profession}})MERGE (p:Person{name:{candidateid}}) CREATE (p)-[:working_as]->(pr)',
		params: {
			profession: req.profession,
			candidateid: req.candidateid

		}
	},
	function(err, results) {
		if(err) {
			console.log(err);
		}else{
	 console.log('***************************************** Profession Finished');
		}
	});
};

module.exports = {
	createProfessionNode: createProfessionNode
};
