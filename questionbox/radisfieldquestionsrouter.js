var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err) {
    console.log("Error " + err);
});

client.hgetall("qBoxQuery", function(err, obj) {
    console.log("Inside get", obj);
})

module.exports = client;
