var mongoose = require('mongoose');
var modelCircle = require('./circleSchema');
var circles = mongoose.model('circles', modelCircle);

findCirclesByName = function(circleNameArray, successRes, errorRes) {
    console.log("enter in mongo circleFind ");
    circles.find({
            name: { $in: circleNameArray }
        }, { _id: 0, __v: 0 },
        function(err, circleObjArray) {
            //console.log(data);
            if (err) {
                console.log(err);
                errorRes(err);
            }

            console.log(circleObjArray);
            successRes(circleObjArray);

        });
}

circlePostMongo = function(req, errRes) {
    circles.create({
            name: req.name,
            circleDiscription: req.circleDiscription,
            domain: req.domain,
            circleType: req.circleType,
            visuality: req.visuality,
            profilePic: req.profilePic

        }, function(err) {
            if (err) {

                errRes(err);
            }
        }

    );

}

module.exports = {
    findCirclesByName: findCirclesByName,
    circlePostMongo: circlePostMongo
};
