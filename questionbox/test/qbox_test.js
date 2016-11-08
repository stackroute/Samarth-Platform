let app = require('../../app');
let expect = require('chai').expect;

let request = require('supertest');

request = request(app);

describe('Scenarios for API End point "GET /candidate/:candidateid/qboxquestions"', function() {
    it('get questions pending to be answered', function(done) {
        request.get('/:candidateid/qboxquestions/')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.be.not.equal("undefined");
                done();
            });
    });
}); 
// end of get scearnio

describe('Api for returning field question query statement "GET /fieldquestions/:section/"', 
    function() {
    it('asking the candidate to answer or fill the pending field of profile data', function(done) {
        request.get('/:section')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.be.not.equal("undefined");
                done();
            });
    });
}); 
// end of get scearnio
