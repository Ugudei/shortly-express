const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  //accesses the parsed cookies
  console.log('req cookies: ', req.cookies);
  //
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

