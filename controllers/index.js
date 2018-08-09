const mongoose = require('mongoose');
const MLAB_URI = 'mongodb://'+ process.env.USER + ':' + encodeURIComponent(process.env.PASS) + '@' + process.env.HOST + '.mlab.com:' + process.env.DB_PORT + '/' + process.env.DB;

exports.HOMEPAGE = function(req, res, next) {
  //Initialize database connection
  mongoose.connect(MLAB_URI || 'mongodb://localhost/exercise-track', {useNewUrlParser: true});
  mongoose.Promise = global.Promise;
  const db = mongoose.connection;
  db.on('error', function(error){
    next({status: 500, message: "Connection error: " + error});
  });
  db.on('open', function() {
    res.sendFile('/app/views/index.html')
  });
};
