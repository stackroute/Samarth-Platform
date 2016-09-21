var http = require('http');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var authRoutes = require('./auth/auth/authRoutes');
// var userRoutes = require('./auth/user/userRoutes');
var projectRoutes = require('./sectionproject/projectrouter');
var educationRoutes = require('./sectioneducation/educationrouter');
var skillRoutes = require('./sectionskill/skillrouter');
var profileRoutes = require('./profiles/profilerouter');
var workRoutes = require('./sectionworkexperiance/workrouter');
var candidateRoutes= require('./candidate/candidaterouter');
var personalinfoRoutes=require('./sectionpersonalinfo/personalinforouter');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var server = http.createServer(app);
server.listen(8081);

var db = mongoose.connect('mongodb://localhost:27017/SamarthDb');

console.log("Server started...");

app.get("/lang", function(req, res) {

});

app.use('/auth', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}, authRoutes);

// app.use('/user', function(req, res, next) {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }, userRoutes);

app.use("/project", function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

}, projectRoutes);

app.use('/education', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

}, educationRoutes);

app.use("/skill", function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

}, skillRoutes);

app.use("/profile", function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

}, profileRoutes);

app.use("/work",  function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

},workRoutes);

app.use("/candidate",  function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

},candidateRoutes);

app.use("/personalinfo",  function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

},personalinfoRoutes);

module.exports = app;
