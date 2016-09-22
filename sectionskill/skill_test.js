var app = require('../app');
var expect = require('chai').expect;

//Supertest is a library to test apps, which have API endpoints or Request/Response based
//Supertest wraps "Superagent", HTTP request/response library for server side
var request = require("supertest");

//Initilise supertest to tes the module, which you want to test 
request = request(app);

//Make GET request to URL "/" and get a 200 res within 10ms
//describe -> testscenario
describe("Get Skill Data Testing Suite", function() {
 
    it('Get skills for the particular candidate profile', function(done) {
        request.get("/skill/:candidateid")
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
        it('check if skill section exits while retreiving skills for candidate profile', function(done) {

        })
    });

}); //end of describe
describe("post Skill Data Testing Suite", function() {

    it('check for duplicate candidate_id while creating skill section first time', function() {

    });

    it('check for duplicate skills while adding new skills ', function() {

    });
    it('Add skill for first time ',function(){
        request.post("/skill/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
         });
    });
    it('check if skill section exist while adding any skills',function(){
        request.post("/skill/:candidateId")
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.equal("skill section doesnt exist");
                    done();
         });
    });
    it('post a new skill',function(){
        request.post("/skill/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
        });
    });
    it('post a skill with experience year negative',function(){
        request.post("/skill/:candidateId")
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.equal("invalid data");
                    done();
        });
    })
}); //end of describe

describe("Update Skill Data Testing Suite", function() {

    it('updating a skill while skill section doesnt exists ', function() {
        request.patch("/skill/:candidateId")
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.equal("skill section doesnt exist while updating new skill");
                    done();
        });
    });

    it('check if skill section exist while updating a skill ', function() {
        request.patch("/skill/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
        });
    });
    it('update a skill ',function(){
        request.patch("/skill/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
        });
    });
    it('update a skill with negative experience year',function(){
        request.patch("/skill/:candidateId")
                .expect(500)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.equal("invalid data");
                    done();
        });
    });
}); //end of describe
