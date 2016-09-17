var app = require('../app');
var expect = require('chai').expect;

//Supertest is a library to test apps, which have API endpoints or Request/Response based
//Supertest wraps "Superagent", HTTP request/response library for server side
var request = require("supertest");

//Initilise supertest to tes the module, which you want to test 
request = request(app);

//Make GET request to URL "/" and get a 200 res within 10ms
//describe -> testscenario
describe("Skill Data Testing Suite", function() {

    it('get skills for the particular candidate profile', function(done) {
        request.get("/skill/:candidateid")
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });
    it('get all the skills for all the candidate profiles', function(done) {
        request.get("/skill")
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });


    // it('Add skill to a empty profile', function(done) {
    //     //skill should get added without any error
    //     //a new entry for candidate in skill collection should be created
    //     //the skill passed should be added as 0th element in the skill collection for the candidate
    //     var skillObj = {
    //         candidateid: "vckgupta008",
    //         skills: [{
    //             "skillname": "angular",
    //             "category": "secondary",
    //             "expertise": "skilled",
    //             "experience": "8",
    //             "metadata": {}
    //         }]
    //     };
    //     request.post("/skill/:candidateid")
    //         .send(skillObj)
    //         .expect(203)
    //         .end(function(err, res) {
    //             if (err) {
    //                 done(err)
    //             }
    //             // expect(res.body).to.be.not.equal(undefined);
    //             done();
    //         });
    //     var skill = [{
    //         "skillname": "angular",
    //         "category": "secondary",
    //         "expertise": "skilled",
    //         "experience": "8",
    //         "metadata": {}
    //     }];
    //     request.post("/skill/:candidateid")
    //         .send(skill)
    //         .expect(204)
    //         .end(function(err, res) {
    //             if (err) {
    //                 done(err)
    //             }
    //             // expect(res.body).to.be.not.equal(undefined);
    //             // done();
    //         });
    // });

    // it('Add a new skill to profile having one or more skills already', function(done) {
    //     done();
    // });

    // it('Try adding duplicate skill', function(done) {});

    // it('Try adding new skill in different case', function(done) {});

    // it('Add skill without experience level', function(done) {});

    // it('Add skill with experience level in negative', function(done) {});

    // it('Add skill without skill name', function(done) {});



    // it('Post a skill record', function(done) {
    //     request.post("/skill")
    //         .expect(201)
    //         .end(function(err, res) {
    //             if (err) {
    //                 done(err)
    //             }

    //             expect(res.body).to.be.not.equal(undefined);
    //             //expect(res.body).to.be.equal("");
    //             //expect(Object.keys(res.body).length).to.be.at.least(6);

    //             done();
    //         });
    // });

}); //end of describe
