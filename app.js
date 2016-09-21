var http = require('http');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var authRoutes = require('./auth/auth/authRoutes');
var userRoutes = require('./auth/user/userRoutes');
var projectRoutes = require('./sectionproject/projectRouter');
var educationRouter = require('./sectioneducation/educationrouter');
var skillRoutes = require('./sectionskill/skillrouter');
var profilerouter = require('./profiles/profilerouter');
var workRouter = require('./sectionworkexperiance/workrouter');
var qboxRouter = require('./questionbox/qboxrouter');
var fieldQRouter = require('./questionbox/fieldquestionsrouter');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

var server = http.createServer(app);
server.listen(8081);


mongoose.set('debug', true);
/*mongoose.set('debug', function(coll, method, query, doc[, options]) {
    //do your thing
});
*/
mongoose.connect('mongodb://localhost:27017/samarthplatformdb');

console.log("Server started...");

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/*app.use('/candidate', authRoutes,userRoutes,projectRoutes,educationRouter,
                   skillRoutes,profilerouter,workRouter,quesRouter,);
*/

app.use('/candidate', qboxRouter);
app.use('/fieldquestions', fieldQRouter);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use("/project", projectRoutes);
app.use('/education', educationRouter);
app.use("/skill", skillRoutes);
app.use("/profile", profilerouter);
app.use("/work", workRouter);



module.exports = app;
