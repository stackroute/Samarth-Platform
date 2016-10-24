var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:Mad@1995@localhost:7474');



skillRelationBuilder = function(skill,candidateid) {
	console.log("*****************from skillRelationBuilder",candidateid);
	console.log("*****************from skillRelationBuilder",skill);

	db.cypher({
		query:'MERGE (c:Candidate{name:{candidateid}}) MERGE(sk:Skills{skill_name:{skillname}}) MERGE (c)-[r:KNOWS]->(sk)',
		params: {
			candidateid : candidateid,
			skillname : skill
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