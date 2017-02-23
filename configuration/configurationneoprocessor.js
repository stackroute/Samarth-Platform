let neo4j = require('neo4j');   
var neo4jConnection = require("../connections/neo4jconnection.js");
let db = neo4jConnection.getConnection();

let addProfession = function(profName,successCB,errCB) {
    db.cypher({
     query:'MERGE(p:Profession{name:{profName}}) RETURN p.name as profession',
        params: {
            profName: profName         
        }
    }, function(err, profession) {
        if (err){
            errCB(err);
        }
         else {
            successCB(profession);
        }
    } 
    );
}

let addLanguage = function(langName,successCB,errCB) {
    db.cypher({
     query:'MERGE(l:Language{name:{langName}}) RETURN l.name as language',
        params: {
            langName: langName         
        }
    }, function(err, language) {
        if (err){
            errCB(err);
        }
         else {
            successCB(language);
        }
    } 
    );
}

let editProfession = function(oldp,newp, successCB,errCB) {
    db.cypher({
     query:'MATCH(p:Profession{name:{oldp}}) SET p.name = {newp} RETURN p.name as profession',
        params: {
            oldp: oldp,
            newp: newp        
        }
    }, function(err, profession) {
        if (err){
            errCB(err);
        }
         else {
            successCB(profession);
        }
    } 
    );
}

let editLanguage = function(oldl,newl, successCB,errCB) {
    db.cypher({
     query:'MATCH(l:Language{name:{oldl}}) SET l.name = {newl} RETURN l.name as language',
        params: {
            oldl: oldl,
            newl: newl        
        }
    }, function(err, language) {
        if (err){
            errCB(err);
        }
         else {
            successCB(language);
        }
    } 
    );
}

let deleteProfession = function(profName,successCB,errCB) {
    db.cypher({
     query:'MATCH(p:Profession{name:{profName}}) DETACH DELETE p',
        params: {
            profName: profName         
        }
    }, function(err) {
        if (err){
            errCB(err);
        }
         else {
            successCB();
        }
    } 
    );
}

let deleteLanguage = function(langName,successCB,errCB) {
    db.cypher({
     query:'MATCH(l:Language{name:{langName}}) DETACH DELETE l',
        params: {
            langName: langName         
        }
    }, function(err) {
        if (err){
            errCB(err);
        }
         else {
            successCB();
        }
    } 
    );
}

module.exports = {
    addProfession: addProfession,
    editProfession: editProfession,
    deleteProfession: deleteProfession,
    addLanguage: addLanguage,
    editLanguage: editLanguage,
    deleteLanguage: deleteLanguage
};
