var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27018/samarthdb');
 // var db = mongoose.connection;
var schema = require('./users');
var candidateSchema = mongoose.model("candidateSchema", schema);

router.post('/signup/:phonenumber', function(req, res) {

    var newcandidate = new candidateSchema({
        name:req.body.name,
        phonenumber:req.body.phonenumber,
        
        email:req.body.email
     
 });
    newcandidate.save(function(err, docs) {
        if (err) {
            console.error("Error in saving the user ", err);
            return res.status(500).json({ error: "Internal error" })
        }
         console.log(docs);
        res.json(docs);
    });
    //console.log("the saving data is here");

})
router.get('/signup/:phoneno', function(req, res) {

       candidateSchema.find({ 'phonenumber': req.params.phoneno }, function(err, docs) {

        if (err) {
            console.error("you are not registered ", err);

            return res.send(err);

        }
        console.log(docs);
        res.json(docs);
    });
})


module.exports = router;
