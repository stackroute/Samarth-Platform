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

let addLocation = function(locName,successCB,errCB) {
    db.cypher({
     query:'MERGE(l:Location{name:{locName}}) RETURN l.name as location',
        params: {
            locName: locName         
        }
    }, function(err, location) {
        if (err){
            errCB(err);
        }
         else {
            successCB(location);
        }
    } 
    );
}

let editProfession = function(oldp,newp, successCB,errCB) {
    db.cypher({
     query:'MERGE(p:Profession{name:{oldp}}) ON CREATE SET p.name = {newp} ON MATCH SET p.name = {newp} RETURN p.name as profession',
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
     query:'MERGE(l:Language{name:{oldl}}) ON CREATE SET l.name = {newl} ON MATCH SET l.name = {newl} RETURN l.name as language',
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

let editLocation = function(oldl,newl, successCB,errCB) {
    db.cypher({
     query:'MERGE(l:Location{name:{oldl}}) ON CREATE SET l.name = {newl} ON MATCH SET l.name = {newl} RETURN l.name as location',
        params: {
            oldl: oldl,
            newl: newl        
        }
    }, function(err, location) {
        if (err){
            errCB(err);
        }
         else {
            successCB(location);
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

let deleteLocation = function(locName,successCB,errCB) {
    db.cypher({
     query:'MATCH(l:Location{name:{locName}}) DETACH DELETE l',
        params: {
            locName: locName         
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
    deleteLanguage: deleteLanguage,
    addLocation: addLocation,
    editLocation: editLocation,
    deleteLocation: deleteLocation
};
