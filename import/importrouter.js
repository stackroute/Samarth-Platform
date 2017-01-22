let router = require('express').Router();
let constants = require('../authorization/constants');
let authorization = require('../authorization/authorization');
// let importschema = require('./importschema');
// let importprocessor = require('./importprocessor');

// router.post('/', function(req, res) {
//     try {
//         let fileData = req.body;

//         importprocessor.getFil(,

//             },
//             function errorCB(error) {
//                 res.status(500).json({
//                     status: 'failed',
//                     error: 'Some error occurred'
//                 });
//             });
//     } catch (err) {
//         return res.status(500).send('Some error occured');
//     }
// });

router.post('/', function(req, res, next){
	authorization.isAuthorized(req, res, next, req.user._doc.userRole[0], constants.CREATE, constants.ADMIN);
},
 function(req, res) {
    var sampleFile;
    console.log(req);
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.file;
    console.log(sampleFile);
    sampleFile.mv('uploads/'+sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded-->' + sampleFile.name + '!');
        }
    });
});

module.exports = router;
