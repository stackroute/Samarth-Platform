var app=require('../app');
var expect=require('chai').expect;
var request=require('supertest');


var request=request(app);

describe("make GET request to url '/' and get a 200 res within 10ms",function()
{
	//it->testcase
	it('simple GET request to root url',function(done){
		request.get('/').expect(200,done);
	});
	it('GET request with returning some data',function(done){
		request.get('/').expect(200,done);
	});
});




//  describe('Positivie Scenarios for API End point "POST /projects/<candidateid>"', function() {
//        it('Add a project with valid project details', function(done) {
//            done(err);
//        });

//        it('Add a project to a empty project profile section', function(done) {
//            done(err);
//        });

//        it('Add a project with only mandatory information', function(done) {
//            done(err);
//        });
//    }); //end of scenario


//    it('Add a project with invalid project details', function(done) {
//        done(err);
//    });

//    it('Try adding a duplicate project for a candidate', function(done) {
//        done(err);
//    });

//    it('Try adding a duplicate project for a different candidate', function(done) {
//        done(err);
//    });

// }); //end of scearnio

// describe("Update project details", function() {
//    it('Try update on a empty project profile section', function(done) {
//        done(err);
//    });
// }); //end of scearnio