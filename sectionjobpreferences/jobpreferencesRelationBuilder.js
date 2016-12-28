let neo4j = require('neo4j');   
var neo4jConnection = require("../connections/neo4jconnection.js");
  
let db = neo4jConnection.getConnection();
   

let jobpreferencesRelationBuilder = function(preferenceObj, candidateid){
  console.log("neo");
  console.log(preferenceObj.looking_jobs);
  console.log(candidateid);
  db.cypher({
    /*query: 'MERGE (job_seekers:job_seeker{name:{job_seeker}}) MERGE (p:Person{name:{candidateid}})-[r:candidate_preference]-> (job_seekers)',*/
    /*query: 'MERGE (c:Candidate{name:{candidateid},Interested_in_job:{looking_jobs}})',*/
    query: 'MATCH (c:Candidate{name:{candidateid}}) set c.Interested_in_job="job_seeker"',
    params: {
      looking_jobs: preferenceObj.looking_jobs,
      candidateid: candidateid
    }
  },
  function(err,results){
    if(err){
      console.log(err);
    }
    else{
      console.log("zsfdf"+results);
      return results;
    }
  });
};

module.exports = {
    jobpreferencesRelationBuilder: jobpreferencesRelationBuilder
};
