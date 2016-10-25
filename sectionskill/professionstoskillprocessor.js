var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');


professionskill = function(skillname,candidateid,successCB,errorCB) {
	
	//console.log("----------------------------",req);
	db.cypher({
		query:'MATCH (c:Candidate{name:{candidateid}})-[r:working_as]->(p:Profession) MATCH (p)-[rel:requires]->(sk:Skills{name:{skillname}}) RETURN count(rel) as x',
		params: {
			candidateid : candidateid,
			skillname : skillname
		}
	},function(err,results) {
		if(err) {
			errorCB(err);
			//console.log(err);
		}else{
			//console.log("inside professionskill ****************");
			// var value = results[0];
			 var v = results[0].x;

			//console.log("@@@@@@@@@@@@@@@@@@@@@@@@",);
			successCB(v);
			
		}
	});
}

module.exports = {
	professionskill : professionskill
}