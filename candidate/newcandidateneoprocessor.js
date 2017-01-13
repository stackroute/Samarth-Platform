let Q = require("q");
let neo4jConnection = require("../connections/neo4jconnection");

//let session = neo4jConnection.session();

getSearchArray = function(req) {
try{
   let deffer = Q.defer();
   let searchArray = {};
   req = req.toLowerCase();
   console.log('req ----->', req);
   let session = neo4jConnection.getBoltStreamConnection();
   session.run('MATCH(n) return n')
       .subscribe({
           onNext: function(lexicon) {
               // console.log("lexicon ------> ", lexicon._fields[0].properties.name);
               if (lexicon._fields[0].properties.name != undefined) {
                   // console.log(req.indexOf(lexicon._fields[0].properties.name.toLowerCase()));
                   if (req.indexOf(lexicon._fields[0].properties.name.toLowerCase()) > -1) {
                       //searchArray.push(lexicon._fields[0].properties.name);
                       console.log(lexicon._fields[0].properties.name+"llllllllllllll");
                       searchArray[lexicon._fields[0].properties.name] = lexicon._fields[0].properties.name;
                   }
               }
           },
           onCompleted: function() {
               // lexiconStream.end()
               // console.log(searchArray);
               //successCB(Object.keys(searchArray));
               deffer.resolve(Object.keys(searchArray));
           },
           onError: function(err) {
               //console.log('Error in Stream Reading', err);
               //errorCB(err);
               deffer.reject(err);
           }
       });

   return deffer.promise;

}
catch(err)
{
    console.log(err);
}
}

getAllCandidates = function(tokenArr) {
   let deffer = Q.defer();
   let candidateArray = [];

   /*session.run("MATCH (n:Candidate)-[]->(p) where p.name IN {names} with distinct n return n as candidateid", {
           names: tokenArr
       })*/
   let session = neo4jConnection.getBoltStreamConnection();
   session.run("MATCH (n) -[r:SAME_AS] -(s) where n.name in {names} with  collect(s.name) as arr MATCH (c:Candidate)-[]->(p) where p.name IN arr with distinct c return c as candidateid UNION MATCH (c:Candidate)-[]->(p) where p.name in {names} with distinct c return c as candidateid", {
           names: tokenArr
       })
       .subscribe({
           onNext: function(lexicon) {
               //console.log('lexicon._fields[0].properties.name --->',lexicon);
               let candidateobj = {};
               candidateobj[lexicon.keys[0]] = lexicon._fields[0].properties.name;
               candidateArray.push(candidateobj);
           },
           onCompleted: function() {
               console.log('resolving -----', candidateArray);
               deffer.resolve(candidateArray);
           },
           onError: function(err) {
               //console.log('Error in Stream Reading', err);
               //errorCB(err);
               deffer.reject(err);
           }
       });
  return deffer.promise;
}

module.exports = {
  getSearchArray: getSearchArray,
  getAllCandidates: getAllCandidates
}