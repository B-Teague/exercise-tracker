'use strict'

const mongoose = require('mongoose');
const exerciseLogSchema = require('./ExerciseLog').schema;
const shortid = require("shortid");
const errors = {
  usernameLength: 'Username must be between 4 and 20 characters',
  invalidUsername: 'Invalid character used. Valid characters include alphanumeric and underscore',
  usernameReq: 'Please enter a username'
}

const validUsername = /^[a-zA-Z][a-zA-Z0-9_]*$/;

const exerciseUserSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [4, errors.usernameLength],
    maxlength: [20, errors.usernameLength],
    required: [true, errors.usernameReq],
    match: [validUsername, errors.invalidUsername],
    unique: true
  },
  _id: {
    type: String,
    default: shortid.generate()
  },
  Log: [exerciseLogSchema]
}, { usePushEach: true });

module.exports = mongoose.model('ExerciseUser', exerciseUserSchema);
