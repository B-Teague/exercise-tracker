'use strict';
const dbConnect = require('../datastore/dbConnect');
const MC = require('./modelController');

exports.CREATE_USER = async function(req, res, next) {
  try {
    const db = await dbConnect.getDb();
    const [error, data] = MC.validate(
      req.body,
      MC.EXERCISE_USER);
    if(error){
      next(error);
    } else {
      const result = await db.collection('exerciseusers').insertOne(
        data, {returnNewDocument: true});
      res.json(result.ops[0]);
    }
  }
  catch (err){
    if(err.code === 11000) {
      next({status: 400, message: "username already taken"});
    } else {
      next(err);
    }
  }
};

exports.CREATE_LOG = async function(req, res, next) {
  
  try{
    const db = await dbConnect.getDb();
    const [error, data] = MC.validate(req.body, MC.EXERCISE_LOG);
    if(error){
      next(error);
    } else {
      const result = await db.collection('exerciselogs').insertOne(
        data, {returnNewDocument: true});
      res.json(result.ops[0]);
    }
  } catch (err) {
    next(err);
  }
  
};

exports.GET_LOG = async function(req, res, next) {
  
  try{
    const db = await dbConnect.getDb();
    const [error, data] = MC.validate(req.query, MC.EXERCISE_SEARCH);
    if(error){
      next(error)
    } else {
      const cursor = await db.collection('exerciselogs')
      .find({
        userId: data.userId,
        $and: [
          { date: { $gte: data.from } },
          { date: { $lte: data.to } }
        ]
      })
      .limit(data.limit);
      res.json(await cursor.toArray());
    }
  } catch (err) {
    next(err);
  }
  
};

exports.GET_USERS = async function(req, res, next) {
  try{
    const db = await dbConnect.getDb();
    const cursor = await db.collection('exerciseusers').find({});
    const users = await cursor.toArray();
    res.json(users);
  } catch (err) {
    next(err);
  }
};
