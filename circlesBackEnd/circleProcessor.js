// let circleMongoProcessor = require('./circleMongoProcessor');
let circleNeo4jProcessor = require('./circleNeo4jProcessor');

getCircle = function(req, successRes, errorRes) {
     try {
        circleNeo4jProcessor.getCircles(req.entityname,
            function(neodata) {
               let mongoarray = [];
                let newcircle = {};

                /*console.log("neo"+neodata[0].name);
                 console.log("neo"+neodata[1].name);
                 console.log("neo"+neodata[2].name);*/
                 console.log(neodata.length);
                 for(var i=0;i<neodata.length;i++)
                 {

                   newcircle = neodata[i];
                   console.log(i+" "+newcircle);
                    mongoarray.push(newcircle);
                    // console.log(mongoarray);
                 }
                 console.log("mongoarray"+mongoarray);
                        successRes(mongoarray);
                      },
                    function(err) {
                        errorRes(err);
                      });

//             },
//             function(err) {
//                 errorRes(err););
   } catch (err) {
   console.log('error in getcircle',err);
         res.status(500).json({ error: 'Something went wrong internally, please try later or report issue' });
   }
 };
createRelation = function(req, errorRes) {
  console.log("reached circleBackEnd")
    circleNeo4jProcessor.createRelation(req, function(err) {
        errorRes(err);
    });
};
circlePost = function(req, errRes) {

    circleMongoProcessor.circlePostMongo(req, function(err) {
        errRes(err);

    });

    // circleNeo4jProcessor.creacteNode(req, function(err) {
    //     errRes(err);
    // });
};
module.exports = {
    getCircle: getCircle,
    circlePost: circlePost,
    createRelation: createRelation
};
