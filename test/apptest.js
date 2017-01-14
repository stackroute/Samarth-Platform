var neo4jConnection = require("../connections/neo4jconnection.js");
var app = require('../app');
var expect = require('chai').expect;

//Supertest is a library to test apps, which have API endpoints or Request/Response based
//Supertest wraps "Superagent", HTTP request/response library for server side
var request = require("supertest");
var server = request.agent("http://localhost:8082");
//Initilise supertest to tes the module, which you want to test 
request = request(app);


//Describe testing whether the instance is  singleton or not
describe("Describe testing whether the instance is  singleton or not",function () {
	
	it('Checking whether all the instances of the sigleton is same or not', function(done) {
		var instance1 = neo4jConnection.getConnection();
		var instance2 = neo4jConnection.getConnection();
		console.log('------>',instance2);
		expect(instance1).to.equal(instance2);
		done()
	});

})

//Make GET request to URL "/" and get a 200 res within 10ms
//describe -> testscenario
describe("Make GET request to URL '/' and get a 200 res within 10ms", function() {

	//it -> testcase
	it('Simple GET Request to root url', function(done) {
		request.get('/').expect(404, done);
	});

	it('Testing for not defined route', function(done) {
		request.get('/_undefined_route').expect(404, done);
	});

}) //end of describe

describe('API test for skill Deletion',function () {
  
it('get a JSON Success(201) response',function(done){
	   server
		   .delete('/skill/:candidateid/:skillname')
		   .expect('Content-Type', 'application/json; charset=utf-8')
		   .expect(201,done);
	 });
})

describe('API test for qualification Deletion',function () {
  
it('get a JSON Success(201) response',function(done){
	   server
		   .delete('/education/:candidateid/:title')
		   .expect('Content-Type', 'application/json; charset=utf-8')
		   .expect(201,done);
	 });
});
