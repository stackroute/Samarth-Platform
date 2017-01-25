let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let createNodes = function (centerLocation,cname,region,centerCode,SuccessCB) {
	console.log("HHHHHHHHHHHHhhh " + cname);
	console.log(centerLocation,cname,region,centerCode);
	var domain = "placementcenter";
	db.cypher({
		query: 'MERGE (n:circle{name:{centerCode},cname:{cname},region:{region},domain:{domain}}) MERGE (l:Location{name:{centerLocation}}) MERGE(n)-[:memberOf]->(l)',
		params: {
			centerCode: centerCode,
			centerLocation: centerLocation,
			cname: cname,
			domain: domain,
			region: region
		},
		}, function(err,results) {
		console.log("in hrer")
	if(err)
	{
		  SuccessCB(err,null)
	}
		else{
			console.log("hiiiiiiiiii in neo");
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

	let getCenterCirclesWithStats  = function (successCB, errorCB) {
		console.log("In getCenterCirclesWithStats");
		db.cypher({
			query: 'match (c:circle {domain:"placementcenter"}) optional  match (c)-[canm:memberOf]-(can:Candidate) optional match (c)-[corm:memberOf]-(cor:coordinator) return c.name, c.cname, c.cname as profession, count(canm) as NbrOfCandidates, count(corm) as NbrOfCoordinators',
			params: {},
		}, function(err, results) {
			console.log("done: ", results);
			if(err)
			{
				console.log('error', err);
				errorCB(err)
			}
			else{
				console.log('results,.........');
				console.log(results);
				successCB(results)
			}
		});

	};

module.exports = {
	createNodes : createNodes,
	getPlacementc : getPlacementc,
	getCenterCirclesWithStats : getCenterCirclesWithStats
};
