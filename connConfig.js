let connConfig = function () {
    return {
        "neoconn" : "http://neo4j:password@localhost:7474",
        "mongoconn":"mongodb://localhost:27017/samarthplatformdb",
        "neo4jhost":"localhost",
        "neo4juser":"neo4j",
        "neo4jpwd":"password"
    }
}

module.exports = connConfig;
