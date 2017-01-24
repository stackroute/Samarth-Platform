let expect = require('chai').expect;
let importer = require('../profileImport/candidateProfileImporter');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

describe('Unit Test for candidate profile import', function() {
    
    /*it('Import a single candidate data', function(done) {
    	 // this.timeout(5000);

			  let candidateImportObj = require('./singleCandidateImportData.json')[0];

    		importer.importCandidateProfile(candidateImportObj)    		
    		.then(function(candidateObj){
    			expect(candidateObj.candidateid == candidateImportObj.mobile);
    			expect(candidateObj._id !== null);
    			done();
    		}, function(err){
    			done(err);
    		});
    });*/

    it('Import multiple candidate profiles', function(data){
    	this.timeout(100000);

    	let candidateColln = require('./singleCandidateImportData.json');

    		importer.importCandidateProfileColln(candidateColln)    		
    		.then(function(result){
    			console.log("Multiple profile import final result ", result);
    			done();
    		}, function(err){
    			done(err);
    		});
    })
})
