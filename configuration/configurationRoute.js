let router = require('express').Router();
let configurationNeoProcessor = require('./configurationneoprocessor');
let authorization = require('../authorization/authorization');
let constants = require('../authorization/constants');


router.post('/profession',function(req, res, next){
	authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.CONFIGURATIONS);
},function (req,res) {
    try{
    	let profName = req.body.profName;
        configurationNeoProcessor.addProfession(profName,                            
                            function(profession)
                            {
                                res.status(200).json(profession);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
				res.status(500).json({
					error: 'Internal error occurred, please report'
				});
			}
   
}); //end

router.post('/language',function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.CREATE,constants.CONFIGURATIONS);
},function (req,res) {
    try{
        let langName = req.body.langName;
        configurationNeoProcessor.addLanguage(langName,                            
                            function(language)
                            {
                                res.status(200).json(language);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
   
}); //end

router.patch('/editprofession',function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.EDIT,constants.CONFIGURATIONS);
},function (req,res) {
    try{
        let oldProf = req.body.oldProf;
        let newProf = req.body.newProf;
        console.log("old:" + oldProf);
        console.log("new:" + newProf);
        configurationNeoProcessor.editProfession(oldProf, newProf,                            
                            function(profession)
                            {
                                res.status(200).json(profession);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
   
}); //end

router.patch('/editlanguage',function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.EDIT,constants.CONFIGURATIONS);
},function (req,res) {
    try{
        let oldLang = req.body.oldLang;
        let newLang = req.body.newLang;
        console.log("old:" + oldLang);
        console.log("new:" + newLang);
        configurationNeoProcessor.editLanguage(oldLang, newLang,                            
                            function(language)
                            {
                                res.status(200).json(language);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
   
}); //end


router.delete('/delprofession/:profName',function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.DELETE,constants.CONFIGURATIONS);
},function (req,res) {
    try{
        // console.log(req.body.profName.profName);
        let profName = req.params.profName;
        configurationNeoProcessor.deleteProfession(profName,                            
                            function()
                            {
                                res.sendStatus(200);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
   
}); //end

router.delete('/dellanguage/:langName',function(req, res, next){
    authorization.isAuthorized(req, res, next,req.user._doc.userRole[0] , constants.DELETE,constants.CONFIGURATIONS);
},function (req,res) {
    try{
        // console.log(req.body.profName.profName);
        let langName = req.params.langName;
        configurationNeoProcessor.deleteLanguage(langName,                            
                            function()
                            {
                                res.sendStatus(200);
                            }, function(err)
                            {
                                res.status(500).json(err);
                            });
}
catch (err) {
                res.status(500).json({
                    error: 'Internal error occurred, please report'
                });
            }
   
}); //end

module.exports = router;