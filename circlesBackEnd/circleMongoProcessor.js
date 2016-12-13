let mongoose = require('mongoose');
let modelCircle = require('./circleSchema');
let circles = mongoose.model('circles', modelCircle);

findCirclesByName = function(circleNameArray, successRes, errorRes) {

    circles.find({
            name: { $in: circleNameArray }
        }, { _id: 0, __v: 0 },
        function(err, circleObjArray) {

            if (err) {
              errorRes(err);
            }
            successRes(circleObjArray);
        });
};

circlePostMongo = function(req, errRes) {
console.log("rishu");
    circles.find({ name: req.name }, function(err, res) {
        if (res === '') {
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
            });
        }
    });
};

module.exports = {
    findCirclesByName: findCirclesByName,
    circlePostMongo: circlePostMongo
};
