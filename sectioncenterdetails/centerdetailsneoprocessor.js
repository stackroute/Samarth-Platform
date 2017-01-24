let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let createNodes = function (centerLocation,domain,cname,address,centerCode,SuccessCB) {
	console.log("HHHHHHHHHHHHhhh " + cname);
	db.cypher({
		query: 'MERGE (n:circle{name:{centerCode},cname:{cname},address:{address},domain:{domain}}) MERGE (l:Location{name:{centerLocation}}) MERGE(n)-[:memberOf]->(l)',



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
			domain: domain,
			address: address
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

	let getPlacementc = function (Location, SuccessCB, errorCB) {
		console.log("In processor");
		db.cypher({
			query: 'MATCH (n:Location{name:{Location}})<-[rel:memberOf]-(c:circle) RETURN c',
			params: {
				Location: Location
			},
		}, function(err, results) {
			console.log("done: ", results);
			if(err)
			{
				console.log('error', err);
				errorCB(err,null)
			}
			else{
				SuccessCB(null,results)
			}
		});

	};

module.exports = {
	createNodes : createNodes,
	getPlacementc : getPlacementc
};