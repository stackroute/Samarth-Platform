let circleMongoProcessor = require('./circleMongoProcessor');
let circleNeo4jProcessor = require('./circleNeo4jProcessor');

getCircle = function(req, successRes, errorRes) {
    try {
        circleNeo4jProcessor.getCircles(req.entityname,
            function(neodata) {

                let mongoarray = [];
                let newcircle = '';
                for (let circle in neodata) {

                    newcircle = neodata[circle].name;
                    mongoarray.push(newcircle);
                }

                circleMongoProcessor.findCirclesByName(mongoarray,
                    function(mongodata) {

                        // Loop through each circle object
                        // update the object with the DomainName, Count obtained from newo4j
                        let uicircles = [];
                        let uicircle = {};
                        for (let mongocircle in mongodata) {
                            for (let neocircle in neodata) {
                                if (neodata[neocircle].name === mongodata[mongocircle].name) {
                                    uicircle = {
                                        name: neodata[neocircle].name,
                                        domain: neodata[neocircle].domain,
                                        profilePic: mongodata[mongocircle].profilePic,
                                        rCount: neodata[neocircle].rCount
                                    };
                                    uicircles.push(uicircle);
                                }
                            }
                        }
                        successRes(uicircles);
                    },
                    function(err) {
                        errorRes(err);
                    });
            },
            function(err) {
                errorRes(err);
            });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
    }
};
createRelation = function(req, errorRes) {

    circleNeo4jProcessor.createRelation(req, function(err) {
        errorRes(err);
    });
};
circlePost = function(req, errRes) {

    circleMongoProcessor.circlePostMongo(req, function(err) {
        errRes(err);

    });

    circleNeo4jProcessor.creacteNode(req, function(err) {
        errRes(err);
    });
};
module.exports = {
    getCircle: getCircle,
    circlePost: circlePost,
    createRelation: createRelation
};
