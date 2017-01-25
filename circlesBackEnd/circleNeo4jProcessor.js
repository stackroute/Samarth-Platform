let neo4j = require('neo4j');
let neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

getCircles = function(entityname, successres, errRes) {
	db.cypher({
		query: 'MATCH (n:coordinator{username:{entityname}})-[r]-(c:circle) match (p:Profession {name:c.name}) match (p)-[rc]-(cd:Candidate) return c.name as name, labels(cd)[0] as domain, count(rc) as rCount',
		params: {
			entityname: entityname
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}
		else{
			successres(results);
		}
	});
};

getCount = function(profs, successres, errRes) {
	db.cypher({
		query: 'match(n:Candidate)-[r]->(p:Profession)where p.name in {profs} return p.name as profession,count(n) as Candidates,  count(CASE WHEN n.Interested_in_job="No" THEN null ELSE n.Interested_in_job END) as Looking,count(CASE WHEN n.Interested_in_job="Yes" THEN null ELSE n.Interested_in_job END) as NotLooking order by  p.name',
		params: {
			profs: profs
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}
		else{
			successres(results);
		}
	});
};

getCoordinator = function(cname, successres, errRes) {
	db.cypher({
		query: 'match (c:circle {domain:"PlacementCenter"}) match (cn:Candidate) match (cr:coordinator) match (c)-[cc:memberOf]-(cn) match (c)-[crc:memberOf]-(cr)  return count(cc) as Candidates, count(crc) as Coordinator',
		params: {
			cname: cname
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}
		else{
			successres(results);
		}
	});
};

getCandidate = function(profs, successres, errRes) {
	db.cypher({
		query: 'optional match()-[r1:applied]->(j:Job) optional match(n:Candidate)-[r]->(p:Profession)where p.name in {profs} return p.name as profession, count(distinct(n)) as Candidates ,count(DISTINCT (CASE WHEN (n:Candidate)-[r1:applied]->(j:Job) then n end)) as applied order by  p.name',
		params: {
			profs: profs
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}
		else{
		   successres(results);
	   }
   });
};




getStatus = function(profs, successres, errRes) {
	db.cypher({
		query:'optional match()<-[r:accepted]-(j:Job) optional match(n:Candidate)-[r1]->(p:Profession)where p.name in {profs}  return p.name as profession,count(DISTINCT(CASE WHEN (j:Job)-[r:accepted]->(n:Candidate)  THEN n  END)) as placed order by  p.name',
		params: {
			profs: profs
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}
		else{
			successres(results);
		}
	});
};

getJob= function(profs, successres, errRes) {
	db.cypher({
		query:'optional match(j:Job)  optional match()-[r]->(p:Profession) where p.name in {profs}return p.name as profession,count(DISTINCT(CASE WHEN (j:Job)-[r]->(p:Profession)   THEN j  END)) as job order by  p.name',
		params: {
			profs: profs
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}else{
			successres(results);
		}
	});
};
getExpiredJob= function(profs, successres, errRes) {
	db.cypher({
		query:'optional match(j:Job) optional match()-[r]->(p:Profession) where p.name in {profs}return p.name as profession,count(DISTINCT(CASE WHEN (j:Job)-[r]->(p:Profession) and toInt(j.closedate) < toInt(timestamp())   THEN j  END)) as expiredjobs order by  p.name',
		params: {
			profs: profs
		}
	},
	function(err, results) {
		if (err) {
			console.log(err);
		}else{
			successres(results);
		}
	});
};
creacteNode = function(req, errRes,res) {
  console.log("in create node "+req.name);
  db.cypher({
	query: 'merge (n:circle{name: {name},domain:{domain}})',
	params: {
		ename: req.name,
		domain: req.domain
	}
},
function(err, results) {
	if (err) {
		errRes(results);
	}
});
};

createRelation = function(req, res) {

	db.cypher({
		query:'merge (n:coordinator{username:{username}, name: {username}}) merge (n)-[:memberOf]-(c:circle {name:{centercode}}) FOREACH (prof in {profs} | merge (c:circle{name:prof}) merge (n)-[r:have_profession]->(c)) FOREACH (lang in {langs} | merge (lg:Language{name:lang.name}) merge (n) -[rt: knows{speak: lang.speak, read: lang.read, write: lang.write}]-> (lg))',
		params: {
			username: req.email,
			profs: req.profession,
			langs: req.language,
			centercode: req.placementCenter
				// profession: reqprofession;
			}
		},
		function(err, results) {
			if (err) {
				res(err);
			}
			res(results);
		});
};
module.exports = {
	creacteNode: creacteNode,
	createRelation: createRelation,
	getCircles: getCircles,
	getCount: getCount,
	getCandidate:getCandidate,
	getStatus:getStatus,
	getJob:getJob,
	getExpiredJob:getExpiredJob
};
