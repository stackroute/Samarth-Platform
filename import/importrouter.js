let router = require('express').Router();
let constants = require('../authorization/constants');
let authorization = require('../authorization/authorization');
let importprocessor = require('./importprocessor');
let redis = require("redis");
let client = redis.createClient();


router.post('/', function(req, res, next){
	authorization.isAuthorized(req, res, next, constants.ADMIN, constants.CREATE, constants.ADMIN);
},
 function(req, res) {
    var sampleFile;
    console.log(req);
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.file;
    console.log("sampleFile JSON....................................");
    console.log(JSON.parse(sampleFile.data.toString('utf8')));
    // console.log(sampleFile.data.JSON.stringify());
    

    importprocessor.createImportData(JSON.parse(sampleFile.data.toString('utf8')),sampleFile.name,function(uploadedId){

			function pushdata(){
						client.rpush('profileImport', uploadedId);
					}
					pushdata();
					res.status(200).json(uploadedId);
				},function(err){
					res.status(500).send("server error...!");
					console.log(err);
				})
    
});

module.exports = router;

