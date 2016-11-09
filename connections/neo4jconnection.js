var neo4j = require('neo4j');

var neo4jconnection = (function() {
    var dbconn;

    function connectToDB() {
        console.log("**** Creating a new Graph DB Connection ****");
        var db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');
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