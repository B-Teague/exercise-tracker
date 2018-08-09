const exerciseLog = require('../models/ExerciseLog');
const exerciseUser = require('../models/ExerciseUser');

exports.CREATE_USER = function(req, res, next) {
    
  //Create a new exerciseUser model
  const newUser = new exerciseUser(req.body);
  // Save the new model instance, passing a callback
  newUser.save(function (err) {

    if (err) { 
      if(err.code === 11000) {
        next({status: 400, message: "username already taken"});
      } else {
        next({status: 500, message: "Error inserting username: " + err.message});
      }
    } else {
      res.json({username: newUser.username, _id: newUser._id});
    }
  });
};

exports.CREATE_LOG = function(req, res, next) {
  //Create a new log model
  if(req.body.date === "") {req.body.date = " "; }
  const newLog = new exerciseLog(req.body);
  
  exerciseUser.findById(
    req.body.userId, 
    function(err, user){
      if(err){
        next({status: 500, message: "Something wrong when updating data!" + err.message});
      } else {

        user.Log.push(newLog);
        user.save(function (err, updatedUser) {

          if (err) { 
             next({status: 500, message: "Error updating username: " + err.message});
          } else {
            res.json(updatedUser);
          }
        });
      }
  });
  
};

exports.GET_LOG = function(req, res, next) {
  //Map query parameters to a exercise Model to perform validation
  //before calling the query finder
  const fromDate = (req.query.from) ? new Date(req.query.from) : new Date('1970-01-01');
  const toDate = (req.query.to) ? new Date(req.query.to) : new Date('9999-12-31');
  const limit = (req.query.limit) ? req.query.limit : 999;
  
  exerciseUser.findById({
    _id: req.query.userId
  } ).
  //limit(req.query.limit).
  //sort({ date: 1 }).
  exec(function(err, doc){
    if(err){
        res.send("Something wrong when updating data!" + err.message)  
    }
    if(doc){
      doc.Log = doc.Log.filter( (log) => {
        return log.date >= fromDate && log.date <= toDate;
      });
      doc.Log = doc.Log.slice(0, limit);
      res.json(doc);
    } else {
      next({status: 400, message: "unknown userId"});
    }
  });
};

exports.GET_USERS = function(req, res) {
  //Map query parameters to a exercise Model to perform validation
  //before calling the query finder
  
  exerciseUser.find({}).
  exec(function(err, doc){
    if(err){
        res.send("Something wrong when updating data!" + err.message)  
    }
    res.send(doc);
  });
};
