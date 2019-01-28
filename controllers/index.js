const dbConnect = require('../datastore/dbConnect');
exports.HOMEPAGE = async function(req, res, next) {
  
  //Initialize database connection
  try {
    await dbConnect.init();
    res.sendFile('/app/views/index.html');  
  } catch (error) {
    next(error);
  }
};