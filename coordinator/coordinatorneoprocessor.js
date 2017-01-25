let neo4j = require('neo4j');
var neo4jConnection = require("../connections/neo4jconnection.js");

let db = neo4jConnection.getConnection();

getProfessions = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Profession) RETURN p.name as professions'
    }, function(err, professions) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(professions);
        }
    });
};

getRole = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Role) RETURN p.name as role'
    }, function(err, role) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(role);
        }
    });
};

getLanguage = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Language) RETURN p.name as language'
    }, function(err, language) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(language);
        }
    });
};

getLocation = function(successCB, errCB) {
    db.cypher({
        query: 'MATCH (p:Location) RETURN p.name as location'
    }, function(err, location) {
        if (err) {
           // console.log(err);
            errCB(err);
        } else {
            successCB(location);
        }
    });
};
getcoordiplace=function(coordinatorId,centerDomain,SuccessCB,errorCB)
    {
        db.cypher({

    query: 'MERGE (n:coordinator{name:{coordinatorId}})<-[rel:memberOf]-(c:circle{name:{centerDomain}}) ',

           params: {
                centerDomain: centerDomain,
                coordinatorId:coordinatorId

           },
        }, function(err,results) {
         console.log(results);
         console.log("done");
         if(err)
         {
             SuccessCB(err,null)
         }
         else{
             SuccessCB(results)
         }
     });

   };




module.exports = {
    getLocation: getLocation,
    getLanguage: getLanguage,
    getRole: getRole,
    getcoordiplace:getcoordiplace,
    getProfessions: getProfessions
}
