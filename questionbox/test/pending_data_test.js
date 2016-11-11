var expect = require('chai').expect;
var superTest = require('supertest');
var myApp = require('.././pendingDataProcessor.js'); 
// var request  = superTest(myApp);
var api = superTest('http://localhost:8081');

describe('Scenarios for API End point', function() {
    it('get questions to be answered', function(done) {
    	myApp.questions(key,value)
        // api.post('/skill/:candidateid')
        //     .expect(200)
        //     .end(function(err, res) {
        //     	console.log(res);
        //         if (err) {
        //             // done(err);
        //         }
        //         expect(res.body).to.be.not.equal("undefined");
        //         done();
        //     });
    });
}); 
// end of get scearnio

// describe('Api for returning field question query statement "GET /fieldquestions/:section/"', 
//     function() {
//     it('asking the candidate to answer or fill the pending field of profile data', function(done) {
//         api.get('/:section')
//             .expect(200)
//             .end(function(err, res) {
//                 if (err) {
//                     // done(err);
//                 }
//                 expect(res.body).to.be.not.equal("undefined");
//                 done();
//             });
//     });
// }); 
// // end of get scearnio
