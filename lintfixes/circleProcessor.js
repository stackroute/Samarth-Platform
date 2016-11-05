let circleMongoProcessor = require('./circleMongoProcessor');
let circleNeo4jProcessor = require('./circleNeo4jProcessor');

getCircle = function(req, successRes, errorRes) {
    try {
        circleNeo4jProcessor.getCircles(req.entityname,
            function(neodata) {
                console.log(neodata);
                //  successRes(neodata);
                let mongoarray = [];
                let newcircle = '';
                for (let circle in neodata) {
                    // console.log(circle);
                    // console.log(neodata[circle].name);
                    newcircle = neodata[circle].name;
                    // console.log(newcircle);
                    mongoarray.push(newcircle);
                }
                // console.log(mongoarray);


                circleMongoProcessor.findCirclesByName(mongoarray,
                    function(mongodata) {
                        console.log(mongodata);
                        // Loop through each circle object
                        // update the object with the DomainName, Count obtained from newo4j
                        let uicircles = [];
                        let uicircle = {};
                        for (let mongocircle in mongodata) {
                            for (let neocircle in neodata) {
                                if (neodata[neocircle].name == mongodata[mongocircle].name) {
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
    console.log('circle processor create relation');
    circleNeo4jProcessor.createRelation(req, function(err) {
        console.log(err);
        errorRes(err);
    });
};
circlePost = function(req, errRes) {
    console.log('********************************************FROM circle Processor', req);
    circleMongoProcessor.circlePostMongo(req, function(err) {
        console.log('******************************************in mongodb processor', err);
        errRes(err);
        // } //, function(result) {
        //     sucessCB(result);
    });

    circleNeo4jProcessor.creacteNode(req, function(err) {
        console.log('****************************************************', err);
        errRes(err);
    });
};
module.exports = {
    getCircle: getCircle,
    circlePost: circlePost,
    createRelation: createRelation
};
