var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:pass@localhost:5432/postgres';
var db = pgp(connectionString);

module.exports = db;
