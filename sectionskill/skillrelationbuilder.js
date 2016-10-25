var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:Mad@1995@localhost:7474');



skillRelationBuilder = function(data) {
	console.log("*****************from skillRelationBuilder",data);

	db.cypher({
		query:'MERGE (c:Candidate{name:{candidateid}}) MERGE(sk:Skills{skill_name:{skillname},experience:{experience}}) MERGE (c)-[r:KNOWS]->(sk)',
		params: {
			candidateid : data.candidateid,
			skillname : data.skillname,
			experience : data.experience
		}
	},function(err,results) {
		if(err) {
			console.log(err);
		}else{
			console.log("Vetri..Vetri...",results);
		}
	});
}

module.exports = {
	skillRelationBuilder : skillRelationBuilder
}