let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let createNodes = function (location,cname,centerCode,SuccessCB) {
	console.log("HHHHHHHHHHHHhhh " + cname);
	db.cypher({
		query: 'MERGE (n:circle{name:{centerCode},cname:{cname}}) MERGE (l:Location{name:{location}}) MERGE(n)-[:memberOf]-(l)',
// MERGE(e:Candidate{name:{name}})  MERGE(n)-[r:belongto]-(e) 

// MERGE(n:circle {centerCode: 1234,name:"centerid"})
// MERGE(v:Location{name:"mumbai"})
// MERGE(e:Candidate{name:"9464297972"})
// MERGE(n)-[rel:locatedIn]-(v)
// MERGE(e)-[r:belongto]-(n)
// RETURN n,rel,v,e

		params: {
			centerCode: centerCode,
			location: location,
			cname: cname
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

module.exports = {
	createNodes : createNodes
};