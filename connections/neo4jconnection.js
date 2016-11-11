let connConfig = require('./../connConfig')();
let neo4j = require('neo4j');

let neo4jconnection = (function() {
    let dbconn;

    function connectToDB() {
        console.log("**** Creating a new Graph DB Connection ****");
        let db = new neo4j.GraphDatabase(connConfig.neoconn);
        return db;
    }

    return {
        getConnection: function() {
            if (!dbconn) {
                dbconn = connectToDB();
            }
            return dbconn;
        }
    };
})();

module.exports = neo4jconnection;