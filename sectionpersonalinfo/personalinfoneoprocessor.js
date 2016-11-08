let neo4j = require('neo4j');
let db = new neo4j.GraphDatabase('http://neo4j:Mad@1995@localhost:7474');

createNode = function(req, errRes) {
	db.cypher({
		query: 'MERGE (l:Location{name:{location}}) MERGE (p:Person{name:{candidateid}})-[r:belongs_to]-> (l)',
		params: {
			location: req.location,
			candidateid: req.candidateid
		}
	},
	function(err, results) {
		if (err) {
			 console.log(err);
		}

		errRes(results);
	});
};


getbyLocation = function(req, err) {
	db.cypher({
		query: 'MATCH (p:Person)-[r:belongs_to]->(l:Location{name:{location}}) RETURN n',
		params: req.location
	},
	function(err, results) {
		if(err) {
			console.log(err);
		}else{
			return results;
		}
	});
};

module.exports = {
	createNode: createNode
};
