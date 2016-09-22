var redis = require("redis"),
    client = redis.createClient();

client.on("error", function(err) {
    console.log("Error " + err);
});

client.get('foo', function(err, reply) {
    console.log("chandan", reply);
    //client.quit();
});

module.exports = client;
