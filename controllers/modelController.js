'use strict';

const ajv = new (require('ajv'))({useDefaults: "empty", coerceTypes: true, removeAdditional: true});
const ajvk = require('ajv-keywords/keywords/dynamicDefaults')(ajv);
const shortid = require('shortid');
//const format = require('date-fns');
const exerciseUser = require(__dirname + '/../models/ExerciseUser.schema.json');
const exerciseLog = require(__dirname + '/../models/ExerciseLog.schema.json');
const exerciseSearch = require(__dirname + '/../models/ExerciseSearch.schema.json');

function MC(){
  this.EXERCISE_USER = 'EXERCISE_USER';
  this.EXERCISE_LOG = 'EXERCISE_LOG';
  this.EXERCISE_SEARCH = 'EXERCISE_SEARCH';
  
  //const newDate = () => {format(new Date(), 'YYYY-MM-DD')}
  
  const definition = require('ajv-keywords').get('dynamicDefaults').definition;
  definition.DEFAULTS.shortid = shortid.generate;
  //definition.DEFAULTS.newDate = newDate;
  
  const isExerciseUserValid = ajv.compile(exerciseUser);
  const isExerciseLogValid = ajv.compile(exerciseLog);
  const isExerciseSearchValid = ajv.compile(exerciseSearch);
  
  this.validate = function(data, schema){
    
    //Deep copy excluding Date objects
    const copy = JSON.parse(JSON.stringify(data));
    
    switch(schema){
      case this.EXERCISE_USER:
        if(isExerciseUserValid(copy)){
          return [null, copy];
        } else {
          return [new Error(JSON.stringify(isExerciseUserValid.errors)), null];
        }
      case this.EXERCISE_LOG:
        if(isExerciseLogValid(copy)){
          return [null, copy];
        } else {
          return [new Error(JSON.stringify(isExerciseLogValid.errors)), null];
        }
      case this.EXERCISE_SEARCH:
        if(isExerciseSearchValid(copy)){
          return [null, copy];
        } else {
          return [new Error(JSON.stringify(isExerciseSearchValid.errors)), null];
        }
      default:
        return [new Error('Invalid schema name'), null];
    }
  }
}

module.exports = new MC();