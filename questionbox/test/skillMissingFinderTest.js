let app = require('.././skillMissingFinder');
let expect = require('chai').expect;

// let request = require('supertest');
 
// request = request(app);

describe('Scenarios for API End point "GET /candidate/:candidateid/qboxquestions"', function() {
    it('get fields pending to be answered', function(done) {
        expect(app.getFieldsNames()).to.be.not.equal("undefined");
        done();
    });
}); 
// end of get scearnio

describe('Scenarios for API End point "GET /candidate/:candidateid/qboxquestions"', function() {
    it('get fields pending to be answered', function(done) {
        expect(app.getFieldsNames()).to.be.not.equal("undefined");
        done();
    });
}); 
// end of get scearnio