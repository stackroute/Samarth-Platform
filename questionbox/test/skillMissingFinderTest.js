let app = require('../../app');
let expect = require('chai').expect;

let request = require('supertest');
 
//let = request('./app');

// describe('Scenarios for API End point "GET /candidate/:candidateid/qboxquestions"', function() {
//     it('get fields pending to be answered', function(done) {
//         expect(app.getFieldsNames()).to.be.not.equal("undefined");
//         done();
//     });
// }); 
// end of get scearnio
describe('Scenarios for API End point "POST /candidate/:candidateid/qboxquestions"', function(){
	it('get fields pending to be answered', function(done){
			console.log('hello');
				request(app)
				.post('/candidates/:candidateId/profile/missingfields')
				// .expect(getFieldsNames().to.be.not.equal("undefined"))
				// .expect(findMissingFields().to.be.not.equal("undefined"))
				.expect(200,done);
	})
})

// describe('Scenarios for API End point "GET /candidate/:candidateid/qboxquestions"', function() {
//     it('get fields pending to be answered', function(done) {
//         expect(app.getFieldsNames()).to.be.not.equal("undefined");
//         done();
//     });
// }); 
// end of get scearnio