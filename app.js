let http = require('http');
let morgan = require('morgan');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let neo4j = require('neo4j');
const bearerToken = require('express-bearer-token');


let baseDataRoutes = require('./basedata/basedataroutes');
let placement=require("./placement/coordinatorrouter.js");
let authRoutes = require('./auth/authrouter');
let apiRoutes = require('./authorization/apirouter');
let authByToken = require('./auth/authbytoken');
let authCoordinatorRouter = require('./authcoordinator/authroutes');
let authCoordinator = require('./authcoordinator/authbytoken');
let circleRoute = require('./circlesBackEnd/circleRout');

let projectRoutes = require('./sectionproject/projectrouter');
let educationRoutes = require('./sectioneducation/educationrouter');
let skillRoutes = require('./sectionskill/skillrouter');
let preferenceRoutes = require('./sectionjobpreferences/jobpreferencesrouter');
let candidateRoutes = require('./candidate/candidaterouter');
let personalinfoRoutes = require('./sectionpersonalinfo/personalinforouter');
let profilerouter = require('./profiles/profilerouter');
let workRouter = require('./sectionworkexperiance/workrouter');
let skillcardRouter = require('./skillcard/skillcardrouter');
let qboxRouter = require('./questionbox/qboxrouter');
let fieldQRouter = require('./questionbox/fieldquestionsrouter');
let skillcardrouter = require('./sectionskill/skillrouter');
let fieldQCache = require('./questionbox/fieldQCache');
// let jobProfileRoutes = require('./jobprofile/jobprofileroute');
let employerRoutes = require('./jobprovider/jobproviderroute.js');
let professiontoskillroutr = require('./professiontoskillsgraphdata/professiontoskillrouter.js');
let jobProfile=require('./jobServer/jobProfileRoute.js');
const placementProcessRouter = require('./placementprocess/placementrouter.js');
/*var rubricRoute = require('./rubricbackend/rubricroute');
var verificationRoute = require('./verification/verificationroute');
var coordinatorRouter = require('./coordinator/coordinatorroute');
var misDetailRoute = require('./questionbox/missingDetailsRouter');
var neo4jConnection = require("./connections/neo4jconnection.js");*/
// let getcoordinatorrouter=require('./coordinator/coordinatorroute');
let rubricRoute = require('./rubricbackend/rubricroute');
let verificationRoute = require('./verification/verificationroute');
let coordinatorRouter = require('./coordinator/coordinatorroute');
let neo4jConnection = require("./connections/neo4jconnection");
// let placement=require("./placement/coordinatorrouter.js");

let app = express();

app.onAppStart = function(addr) {
      console.log('Samarth Platform web services is now Running on port:', addr.port);

    mongoose.set('debug', true);
    /* mongoose.set('debug', function(coll, method, query, doc[, options]) {
        //do your thing
    });
    */
    //let db = new neo4j.GraphDatabase('http://neo4j:password@localhost:7474');

    let db = neo4jConnection.getConnection();

    mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

    // Call any cache loading here if required
    fieldQCache.loadCache();
};

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

process.on('SIGINT', function() {
   // console.log('Going to unload all data from field questions cache...!');
    fieldQCache.clearCache(function() {
     //   console.log('Done unloading Field Question Cache ');
        process.exit(0);
    });
});

app.use('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Authorization, x-user-access-token, x-access-token, Content-Type, Accept'
    );
    next();
});

/* app.use('/candidate', authRoutes,userRoutes,projectRoutes,educationRouter,
                   skillRoutes,profilerouter,workRouter,quesRouter,);
*/

function isAuthenticated(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      //  console.log('Token not found for authentication validation....!');
        return res.status(403).json({
            error: 'Invalid user request or unauthorised request..!'
        });
    }

    clientToken = '@todo';

    authByToken.isCandidateAuthenticated(token, clientToken, function(
        candidateProfile) {
        req.candidate = candidateProfile;
        next();
    }, function(err) {
        return res.status(403).json({
            error: err
        });
    });

    authCoordinator.isCoordinatorAuthenticated(token, clientToken, function(
        coordinator) {
        req.coordinator = coordinator;
        next();
    }, function(err) {
        return res.status(403).json({
            error: err
        });
    });
}

// app.use(bearerToken());
app.use('/basedata', baseDataRoutes);
app.use('/basedata', baseDataRoutes);
app.use('/placement',placement);
app.use('/auth', authRoutes);

app.use('/details', authCoordinatorRouter);
app.use('/', apiRoutes);
app.use('/candidates', qboxRouter);
app.use('/candidate', candidateRoutes);
app.use('/fieldquestions', fieldQRouter);
app.use('/project', projectRoutes);
app.use('/jobpreferences', preferenceRoutes);
app.use('/education', educationRoutes);
app.use('/skill', skillRoutes);
app.use('/profile', profilerouter);
app.use('/work', workRouter);
app.use('/personalinfo', personalinfoRoutes);
app.use('/skillcard', skillcardRouter);
// app.use('/jobprofile', jobProfileRoutes);
app.use('/circle', circleRoute);

app.use('/employer', employerRoutes);
app.use('/rubric', rubricRoute);
app.use('/verification', verificationRoute);
app.use('/coordinatorregister', coordinatorRouter);

app.use('/profession', professiontoskillroutr);

// app.use('/placement',placement);
app.use('/jobProfile',jobProfile);
app.use('/placementprocess',placementProcessRouter);
// app.use('/center',centerdetailsrouter);

module.exports = app;
