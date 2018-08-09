'use strict'

const mongoose = require('mongoose');
const errors = {
  descLength: 'Description must be less than or equal to twenty characters',
  descReq: 'Please enter a description',
  minDuration: 'Duration entered must be at least 15 minutes',
  durationReq: 'Please enter a duration'
};

const exerciseLogSchema = new mongoose.Schema({
  _id: false,
  description: {
    type: String,
    maxLength: [20, errors.descLength],
    required: [true, errors.descReq]
  },
  duration: {
    type: Number,
    min: [15, errors.minDuration],
    required: [true, errors.durationReq]
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('ExerciseLog', exerciseLogSchema);

