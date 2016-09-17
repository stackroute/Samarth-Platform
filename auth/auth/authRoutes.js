
var router = require('express').Router();
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27018/samarthdb');
// var multer = require('multer');
var schema = require('./authSchema');
var signschema = mongoose.model("signschema", schema);
router.post('/signin', function(req, res) {

    var newuser = new signschema({
        username: req.body.phonenumber,
        password: req.body.password,
        
    });
    newuser.save(function(err, docs) {
        if (err) {
            console.error("Error in saving the user ", err);
            return res.status(500).json({ error: "Internal error in completing operation..!" })
        }
        // console.log("User = ",user);
        res.json(docs);
    });
    //console.log("the saving data is here");

})
router.get('/signin/:username', function(req, res) {

    signschema.find({ 'username': req.params.username }, function(err, docs) {

        if (err) {
            console.error("you are not registered ", err);

            return res.send(err);

        }
        console.log(docs);
        res.json(docs);
    })
})
router.patch('/signin/:new_password', function(req, res) {
    var editUser = req.body;
    console.log(editUser);
    signschema.update({ username: editUser.username }, {
        $set: {
            "password": editUser.password
        }
    }, function(err, docs) {
           if (err) {
            console.error("you are not registered ", err);
            return res.send(err);
              }
        console.log(docs);
        res.json(docs);
    })
})




// var upload = multer({ //multer settings
//                     storage: storage
//                 }).single('file');


// var storage = multer.diskStorage({ //multers disk storage settings
//         destination: function (req, file, cb) {
//             console.log('destination');
//             cb(null,'./uploads/');

//         },
//         filename: function (req, file, cb) {
//             var datetimestamp = Date.now();
//             cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
//         }

    // });




                // upload(req,res,function(err){
        //     if(err){
        //          res.json({error_code:1,err_desc:err});
        //          return;

        //     }
        //      res.json({error_code:0,err_desc:null});
       // };
    


 // console.log(storage);

module.exports = router;
