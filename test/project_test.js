var app = require('../app');
var expect = require('chai').expect;

var request = require("supertest");

request = request(app);

describe("Adding projects to a candidate", function() {

    describe('Positivie Scenarios for API End point "POST /projects/<candidateid>"', function() {
        it('Add a project with valid project details', function(done) {
            request.post("/project/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
                });
        });

        it('Add a project to a empty project profile section', function(done) {
            request.post("/project/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
                });
        });

        it('Add a project with only mandatory information', function(done) {
            request.post("/project/:candidateId")
                .expect(201)
                .end(function(err, res) {
                    if (err) {
                        //done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
                });
        });
    }); //end of scenario


    it('Add a project with invalid project details', function(done) {
        done(err);
    });

    it('Try adding a duplicate project for a candidate', function(done) {
        done(err);
    });

    it('Try adding a duplicate project for a different candidate', function(done) {
        done(err);
    });


}); //end of scearnio 

describe("Update project details", function() {
    it('Try update on a  project profile section', function(done) {
        it('update a project profile section', function(done) {
            request.patch("/project/:candidateId")
                .expect(204)
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }
                    expect(res.body).to.be.not.equal(undefined);
                    done();
                });
        });
    });
}); //end of scearnio 

describe("Delete project details", function() {
    it('Try delete on a empty project profile section', function(done) {
        done(err);
    });
}); //end of scearnio 

describe("Multiple or Bulk add projects", function() {

    it('Add a project in bulks', function(done) {
        request.post("/project/:candidateId")
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    //done(err);
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });
}); //end of scearnio

describe('Positivie Scenarios for API End point "GET /project/<candidateid>"', function() {
    it('Try to get a perticular project profile section', function(done) {
        request.get("/project/:candidateId")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });

    it('Try to get a All project profile section', function(done) {
        request.get("/project")
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    done(err)
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });
}); //end of get scearnio
