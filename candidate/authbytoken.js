let jwt = require('jsonwebtoken');
let UserModel = require('./users');
let authCandidate = require('./authcandidate');
const config = require('../config/config');

let signup = function(newUser, callback, unauthCB) {
    let newUserObj = new UserModel({
        uname: newUser.mobile,
        pwd: newUser.pwd,
        status: 'active',
        createdon: new Date(),
        lastseenon: new Date()
    });

    newUserObj.save(function(err, user) {
        if (err) {
            console.error('Error in signup user ', err);
            callback(err, null);
            return;
        }

        if (!user) {
            console.error('Empty user signed up..!');
            callback('Unable to signup the user', null);
        }
    });
};



module.exports = {
    signup: signup,
    signin: signin,
    signout: signout
};
