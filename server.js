'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exerciseRoute = require(__dirname + '/routes/exercise');
const indexRoute = require(__dirname + '/routes/index');
const notFoundHandler = require(__dirname + '/middleware/notFoundHandler');
const errorHandler = require(__dirname + '/middleware/errorHandler');
const cors = require('cors');


app.set('json spaces', 2);
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/exercise', exerciseRoute);
app.use('/', indexRoute);
app.use(notFoundHandler);
app.use(errorHandler);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
