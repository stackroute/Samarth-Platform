var fieldQuestionsModel = require('./fieldquestions');
var fieldQProcessor = require('./fieldQProcessor');
var async = require('async');
var redis = require('redis');
var redisClient = redis.createClient();

module.exports = (function() {

    return {
        redisKeyPrefix: "samarth_fieldqs_",

        makeFieldQCacheKey: function(section, fieldName, lang) {
            var key = this.redisKeyPrefix + section + "_" + fieldName + "_" + lang;
            key = key.toLowerCase();
            return key;
        },

        getFieldQuestion: function(section, fieldName, lang, callback) {
            var queykey = this.makeFieldQCacheKey(section, fieldName, lang);
            redisClient.get(queykey, callback);
        },

        setFieldQuestion: function(fieldQuestion) {
            var key = this.makeFieldQCacheKey(fieldQuestion.section, fieldQuestion.fieldnamem, fieldQuestion.lang);
            var value = fieldQuestion.query;

            redisClient.set(key, value);
        },

        clearCache: function(callback) {
            var fqKey = this.redisKeyPrefix + "*";
            redisClient.keys(fqKey, function(err, keys) {
                async.each(
                    keys,
                    function(key, cb) {
                        redisClient.del(key, cb);
                    },
                    callback
                );
            });
        },

        loadCache: function() {
            //Fetch all field questions from the DB
            //Load each of them with a key of <Section>_<Field>_<Lang> as the format

            var cache = this;

            fieldQProcessor.getAllFieldQuestions(function(colln) {
                if (colln.length <= 0) {
                    return;
                }

                var multi = redisClient.multi();

                for (i = 0; i < colln.length; ++i) {
                    var fieldQuestion = colln[i];

                    var key = cache.makeFieldQCacheKey(fieldQuestion.section, fieldQuestion.fieldname, fieldQuestion.lang);
                    var value = fieldQuestion.query;

                    multi.set(key, value);
                }

                multi.exec(function(err, replies) {
                    if (err) {
                        console.log("Error in loading field questions to redis ", err);
                    }

                    console.log("Loadded ", replies.length, " number of field questions out of ", colln.length);
                });

            }, function(err) {
                throw new Error("Could not load Field Questions to cache.., please check error and retry..!", err);
            });
        }
    };
})();
