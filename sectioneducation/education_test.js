let app = require('../app');
let expect = require('chai').expect;
var request = require('supertest');


var request = request(app);

describe('Get test suit for Qualification section', function()
{
	// it->testcase
	it('Get education section for a given candidate profile', function(done) {
		request.get('/').expect(200, done);
	});
	it('Get if qualification section exist for a given candidate profile', function(done) {
		request.get('/').expect(200, done);
	});
});

describe('post Qualification Data Testing Suite', function() {
    it('check for duplicate candidate_id while creating qualification section first time',function(){

    });

    it('check for duplicate qualifications while adding new qualification ', function() {

    });
    it('Add qualification for first time ', function() {

    });
    it('check if qualification section exist while adding any qualifications', function() {

    });
    it('post a new qualification', function() {

    });
    it('post a qualification with invalid fields', function() {

    });
}); // end of describe

describe('Update qualification Data Testing Suite', function() {
    it('check if qualification exists while updating a qualification ', function() {

    });

    it('check if qualification section exist while updating a qualification ', function() {

    });
    it('update a qualification ', function() {

    });
    it('update a qualification with negative experience year');
}); // end of describe
