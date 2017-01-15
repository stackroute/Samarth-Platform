let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let createNodes = function (location,name,centertype,SuccessCB) {
	console.log("HHHHHHHHHHHHhhh " + name);
	db.cypher({
		query: 'MERGE (l:Location{name:{location}}) MERGE (i:CenterId{cname:{name},ctype:{centertype}}) MERGE(l)-[:Has]->(i)',
		params: {
			location: location,
			name: name,
			centertype: centertype
		},
		}, function(err,results) {
		console.log("in hrer")
	if(err)
	{
		  SuccessCB(err,null)
	}
		else{
		SuccessCB(null,results)
		}
	});
	};
// function (err, results) {
	// 	if (err) {
	// 		errCB(err, null);
	// 	}
	// 	else {
	// 		errCB(null, results);
	// 	}
	// }
module.exports = {
	createNodes : createNodes
};