let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


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
