  var fieldQuestionsModel = require('./fieldquestions');
  var qboxQuestionsModel = require("./qboxquestions")
  var fieldQProcessor = require('./fieldQProcessor');
  var qboxprocessor = require('./qboxprocessor');
  var missingDetailsProcessor = require('./missingDetailsProcessor');
  var async = require('async');
  var redis = require('redis');
  var redisClient = redis.createClient();
  var boxQuestion;

  module.exports = (function() {

      return {
          redisKeyPrefix: "samarth_fieldqs_",
          makeQboxCacheKey: function(section, fieldname, status, response) {
              var Questionkey = this.redisKeyPrefix + section + "_" + fieldname + "_" + status + "_" + response;
              Questionkey = Questionkey.toLowerCase();
              return key;
          },

          makeFieldQCacheKey: function(section, fieldName, lang) {
              // console.log("-------sectioncache-----"+section);
              var key = this.redisKeyPrefix + section + "_" + fieldName + "_" + lang;
              // console.log(key);
              key = key.toLowerCase();
              return key;
          },

          getFieldQuestion: function(section, fieldName, lang, callback) {
              console.log("--sectionInCache----" + section);
              var queykey = this.makeFieldQCacheKey(section, fieldName, lang);
              redisClient.get(queykey, callback);
          },
          setBoxQuestion: function(boxQuestion) {
              var Questionkey = this.makeQboxCacheKey(boxQuestion.section, boxQuestion.fieldname, boxQuestion.status, boxQuestion.response);
              var questionvalue = boxQuestion.instancename;
              redisClient.set(Questionkey, questionvalue);
          },
          setFieldQuestion: function(fieldQuestion) {
              var key = this.makeFieldQCacheKey(fieldQuestion.section, fieldQuestion.fieldnamem, fieldQuestion.lang);
              var value = fieldQuestion.query;

              redisClient.set(key, value);
          },
          getQboxQuestions: function(quesObj) {
              boxQuestion = quesObj;
              // console.log("--------->getQboxQuestions------------>"+boxQuestion.section);
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

              // qboxprocessor.getAllBoxQuestions(function(colln)
              // {
              //    if (colln.length <= 0) {
              //         return;
              //     }//end if
              //     boxQuestion=colln[0].instancename;
              //    // console.log(colln[0].instancename);
              // });
              fieldQProcessor.getAllFieldQuestions(function(colln) {
                  if (colln.length <= 0) {
                      return;
                  } //end if

                  var multi = redisClient.multi();

                  for (i = 0; i < colln.length; ++i) {
                      var fieldQuestion = colln[i];

                      var key = cache.makeFieldQCacheKey(fieldQuestion.section, fieldQuestion.fieldname, fieldQuestion.lang);
                      // console.log("-----keyCache-------"+key);
                      var value = fieldQuestion.query;
                      missingDetailsProcessor.questions(key, value);
                      multi.set(key, value);
                  } //end for

                  multi.exec(function(err, replies) {
                      if (err) {
                          console.log("Error in loading field questions to redis ", err);
                      } //end if

                      console.log("Loadded ", replies.length, " number of field questions out of ", colln.length);
                  }); //end multi exec

              }, function(err) {
                  throw new Error("Could not load Field Questions to cache.., please check error and retry..!", err);
              }); //end loadcache
          }
      };
  })();
