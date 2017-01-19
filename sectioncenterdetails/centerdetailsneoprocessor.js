let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let createNodes = function (centerLocation,cname,centerDomain,centerCode,SuccessCB) {
	console.log("HHHHHHHHHHHHhhh " + cname);
	db.cypher({
		query: 'MERGE (n:circle{name:{centerCode},cname:{cname},centerDomain:{placementCenter}}) MERGE (l:Location{name:{centerLocation}}) MERGE(n)-[:memberOf]->(l)',



// 'MERGE (n:circle{name:{centerCode},cname:{cname},centerDomain:{placementCenter}}) MERGE (l:Location{name:{centerLocation}}) MERGE(n)-[:memberOf]->(l) RETURN n'


// MERGE(e:Candidate{name:{name}})  MERGE(n)-[r:belongto]-(e) 
// MERGE(n:circle {centerCode: 1234,name:"centerid"})
// MERGE(v:Location{name:"mumbai"})
// MERGE(e:Candidate{name:"9464297972"})
// MERGE(n)-[rel:locatedIn]-(v)
// MERGE(e)-[r:belongto]-(n)
// RETURN n,rel,v,e
		params: {
			centerCode: centerCode,
			centerLocation: centerLocation,
			cname: cname,
			centerDomain: centerDomain
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

	// let getPlacementCenter = function (SuccessCB, errorCB) {
	// 	db.cypher({
	// 		query: 'MATCH (c:circle{name:{centerCode}})',
	// 		params: {
	// 			centerCode: centerCode
	// 		},
	// 	}, function(err,results) {
	// 		console.log("done");
	// 		if(err)
	// 		{
	// 			SuccessCB(err,null)
	// 		}
	// 		else{
	// 			SuccessCB(null,results)
	// 		}
	// 	});

	// };

module.exports = {
	createNodes : createNodes,
	// getPlacementCenter : getPlacementCenter
};