'use strict';

const express = require('express');
const router = express.Router();

// Require controller modules.
const exerciseController = require('../controllers/exerciseController');

router.post('/new-user', exerciseController.CREATE_USER);
router.post('/add', exerciseController.CREATE_LOG);
router.get('/log', exerciseController.GET_LOG);
router.get('/all-users', exerciseController.GET_USERS);

module.exports = router;