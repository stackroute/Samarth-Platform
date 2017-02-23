let mongoose = require('mongoose');
let bCrypt = require('bcrypt-nodejs');

let schema = mongoose.Schema({
    uname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: 10
    },
    hash_pwd: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'disabled']
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    lastseenon: {
        type: Date,
        default: Date.now
    }
});

// //virtuals
schema
    .virtual('pwd')
    .set(function(pwd) {
        this._pwd = pwd;
        this.hash_pwd = this.encryptPassword(pwd);
    })
    .get(function() {
        return this._pwd;
    });

schema.methods = {
    validPassword: function(plainText) {
        return bCrypt.compareSync(plainText, this.hash_pwd);
    },

    encryptPassword: function(plainText) {
        return bCrypt.hashSync(plainText, bCrypt.genSaltSync(10), null);
    }
};


module.exports = mongoose.model('users', schema, 'users');
