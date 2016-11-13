  // let fieldQuestionsModel = require('./fieldquestions');
  // let qboxQuestionsModel = require('./qboxquestions');
  let fieldQProcessor = require('./fieldQProcessor');
  // let qboxprocessor = require('./qboxprocessor');
  let async = require('async');
  let redis = require('redis');
  let redisClient = redis.createClient();
  // let boxQuestion;

  module.exports = (function() {
      return {
          redisKeyPrefix: 'samarth_fieldqs_',
          makeFieldQCacheKey: function(section, fieldName, lang) {
              // console.log("-------sectioncache-----"+section);
              let key = this.redisKeyPrefix + section + '_' + fieldName + '_' + lang;
              // console.log(key);
              key = key.toLowerCase();
              return key;
          },

          getFieldQuestion: function(section, fieldName, lang, callback) {
             // console.log('--sectionInCache----' + section);
              let queykey = this.makeFieldQCacheKey(section, fieldName, lang);
              redisClient.get(queykey, callback);
          },
          setBoxQuestion: function(boxQuestion) {
              let Questionkey = 
              this.makeQboxCacheKey(boxQuestion.section, 
                boxQuestion.fieldname, boxQuestion.status, boxQuestion.response);
              let questionvalue = boxQuestion.instancename;
              redisClient.set(Questionkey, questionvalue);
          },
          setFieldQuestion: function(fieldQuestion) {
              let key = 
              this.makeFieldQCacheKey(fieldQuestion.section, 
                fieldQuestion.fieldnamem, fieldQuestion.lang);
              let value = fieldQuestion.query; 

              redisClient.set(key, value);
          },
          clearCache: function(callback) {
              let fqKey = this.redisKeyPrefix + '*';

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
              // Fetch all field questions from the DB
              // Load each of them with a key of <Section>_<Field>_<Lang> as the format

              let cache = this;
              fieldQProcessor.getAllFieldQuestions(function(colln) {
                  if (colln.length <= 0) {
                      return;
                  } // end if

                   let multi = redisClient.multi();

                  for ( let i = 0; i < colln.length; i=i+1) {
                      let fieldQuestion = colln[i];

                      let key = 
                      cache.makeFieldQCacheKey(fieldQuestion.section, 
                        fieldQuestion.fieldname, fieldQuestion.lang);
                    //  console.log('-----keyCache-------' + key);
                      let value = fieldQuestion.query;
                      console.log("--->query--->"+key);
                      multi.set(key, value);
                  } // end for

                  multi.exec(function(err) {
                      if (err) {
                          // console.log('Error in loading field questions to redis ', err);
                      } // end if

                  }); // end multi exec
              }, function(err) {
                  throw new Error('Could not load Field Questions'+
                  ' to cache.., please check error and retry..!', err);
              }); // end loadcache
          }
      };
  }());
