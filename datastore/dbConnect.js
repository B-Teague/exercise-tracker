'use strict';

function dbConnect() {
  const MongoClient = require('mongodb').MongoClient;
  const MLAB_URI = 'mongodb://'+ process.env.USER + ':' + encodeURIComponent(process.env.PASS) 
    + '@' + process.env.HOST + '.mlab.com:' + process.env.DB_PORT + '/' + process.env.DB;
  let db = null;
  
  this.init = async function() {
      try{
        db = (await MongoClient.connect(MLAB_URI, { useNewUrlParser: true } )).db(process.env.DB);
        return null;
      } catch (err){
        throw new Error('Error connecting to Mongo Client: ' + err);
      }    
  };
  
  this.getDb = async function(){
    if(db != null){
      return db;
    } else {
      try{
        await this.init();
        return db;
      } catch (err) {
        throw err;
      }
    }
  };
  
  this.close = async function() {
    if(db != null) {
      try{
        db = await db.close();
        return db;
      } catch (err) {
        throw new Error('Error closing database connection: ' + this.err);
      }
    }
  };
};

module.exports = new dbConnect();