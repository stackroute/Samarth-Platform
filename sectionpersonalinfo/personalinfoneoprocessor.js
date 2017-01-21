let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();

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

createLanguageNode = function(personalinfo, candidateid){
	//console.log("personalinfo "+personalinfo.mothertongue);

	//console.log("candidateid "+candidateid);
	db.cypher({
		query: 'MERGE (lang:Language{name:{language}}) MERGE (p:Person{name:{candidateid}})-[r:speaks]-> (lang)',
		params: {
			language: personalinfo.mothertongue,
			candidateid: candidateid
		}
	},
	function(err,results){
		if(err){
			console.log(err);
		}
		else{
			console.log(results);
			return results;
		}
	});
};


// getbyLanguage = function(candidateid, req) {
// 	db.cypher({
// 		query: 'MATCH (p:Person)-[r:speaks]->(lang:Language{name:{language}}) RETURN n',
// 		params: candidateid
// 	},
// 	function(err, results) {
// 		if(err) {
// 			console.log(err);
// 		}else{
// 			return results;
// 		}
// 	});
// };

module.exports = {
	createNode: createNode,
	getbyLocation: getbyLocation,
	createLanguageNode: createLanguageNode
	//getbyLanguage: getbyLanguage
};
