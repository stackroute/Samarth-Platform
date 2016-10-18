var http = require('http');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var authRoutes = require('./auth/authrouter');
var authByToken = require('./auth/authbytoken');

var projectRoutes = require('./sectionproject/projectrouter');
var educationRoutes = require('./sectioneducation/educationrouter');
var skillRoutes = require('./sectionskill/skillrouter');
var candidateRoutes = require('./candidate/candidaterouter');
var personalinfoRoutes = require('./sectionpersonalinfo/personalinforouter');
var profilerouter = require('./profiles/profilerouter');
var workRouter = require('./sectionworkexperiance/workrouter');
var skillcardRouter = require('./skillcard/skillcardrouter');
var qboxRouter = require('./questionbox/qboxrouter');
var fieldQRouter = require('./questionbox/fieldquestionsrouter');
var resourcebundle = require('./resourcebundle/resourcebundlerouter');
var skillcardrouter = require('./sectionskill/skillrouter');
var fieldQCache = require('./questionbox/fieldQCache');
var rubricRoute = require('./rubricbackend/rubricroute');

var verificationRoute = require('./verification/verificationroute');
var app = express();


app.onAppStart = function(addr) {
    console.log("Samarth Platform web services is now Running on port:", addr.port);

    mongoose.set('debug', true);
    /*mongoose.set('debug', function(coll, method, query, doc[, options]) {
        //do your thing
    });
    */

    mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

    //Call any cache loading here if required
    fieldQCache.loadCache();

}

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

process.on('SIGINT', function() {
    console.log("Going to unload all data from field questions cache...!");
    fieldQCache.clearCache(function() {
        console.log("Done unloading Field Question Cache ");
        process.exit(0);
    });
});

app.use('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Authorization, x-user-access-token, x-access-token, Content-Type, Accept"
    );
    next();
})

/*app.use('/candidate', authRoutes,userRoutes,projectRoutes,educationRouter,
                   skillRoutes,profilerouter,workRouter,quesRouter,);
*/

function isAuthenticated(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        console.log("Token not found for authentication validation....!");
        return res.status(403).json({
            error: 'Invalid user request or unauthorised request..!'
        });
    }

    clientToken = "@todo";

    authByToken.isCandidateAuthenticated(token, clientToken, function(
        candidateProfile) {
        req.candidate = candidateProfile;
        next();
    }, function(err) {
        return res.status(403).json({
            error: err
        });
    });
}

app.use('/auth', authRoutes);

app.use('/candidates', qboxRouter);
app.use('/candidate', candidateRoutes);
app.use('/fieldquestions', fieldQRouter);
app.use("/project", projectRoutes);
app.use('/education', educationRoutes);
app.use("/skill", skillRoutes);
app.use("/profile", profilerouter);
app.use("/work", workRouter);
app.use("/personalinfo", personalinfoRoutes);
app.use("/skillcard", skillcardRouter);

app.use("/resource", resourcebundle);
app.use('/rubric', rubricRoute);
app.use('/verification', verificationRoute);


module.exports = app;
