var obj = require("./resource.json");
var router = require('express').Router();
var fs = require("fs");

router.get("/sidenavEnglish", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	res.status(200).json(obj.sidenavEnglish);
		

});
router.get("/sidenavHindi", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	console.log(obj.sidenavEnglish);
	res.status(200).json(obj.sidenavHindi);	

});
router.get("/navEnglish", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	console.log(obj.navEnglish);
	res.status(200).json(obj.navEnglish);	

});
router.get("/navHindi", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	console.log(obj.navHindi);
	res.status(200).json(obj.navHindi);	

});
router.get("/sectionEnglish", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	console.log(obj.sectionEnglish);
	res.status(200).json(obj.sectionEnglish);	

});
router.get("/sectionHindi", function(req, res) {
	// var contents = fs.readFileSync("resource.json");
	// console.log(contents);
	//  var jsonContent = JSON.parse(contents);
	console.log(obj.sectionHindi);
	res.status(200).json(obj.sectionHindi);	

});

module.exports = router;