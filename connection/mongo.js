const { MongoClient} = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
let myDB;

function main(){
    return client.connect().then((client)=>{
        myDB = client.db("myProject"); 
    }) 
}

function getDB(){
    if(myDB != undefined) return myDB;
    return null;
}

module.exports.mongoConnect = main;
module.exports.getDB = getDB;