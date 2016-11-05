let app = require('../app');
let expect = require('chai').expect;
var request = require('supertest');


var request = request(app);

describe('Get test suit for Profile section', function() {
    // it->testcase
    it('Get education section for a given candidate profile', function(done) {
        request.get('/profile/:candidateId').expect(200, done);
    });
    it('Get if qualification section exist for a given candidate profile', function(done) {
        request.get('/profile/:candidateId').expect(200, done);
    });
});

describe('post Profile Data Testing Suite', function() {
    it('Adding profile section first time', function() {
        request.post('/profile/:candidateId')
            .expect(201)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });

    it('check for duplicate candidateid while adding new profile ', function() {
        request.post('/profile/:candidateId')
            .expect(500)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.equal('duplicate candidate id');
                done();
            });
    });
}); // end of describe

describe('Update profile Data Testing Suite', function() {
    it('updating a profile while profile section doesnt exist ', function() {
        request.patch('/profile/:candidateId')
            .expect(500)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.equal('personalinfo doesnt exist');
                done();
            });
    });


    it('update a profile ', function() {
        request.patch('/profile/:candidateId')
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });
    it('update a profile with invalid data', function() {
        request.patch('/profile/:candidateId')
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    // done(err);
                }
                // expect(res.body).to.be.not.equal(undefined);
                done();
            });
    });
}); // end of describe
