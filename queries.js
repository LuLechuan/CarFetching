var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://username:password@localhost:5432/postgres';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllDrivers: getAllDrivers,
  getSingleDriver: getSingleDriver,
  createDriver: createDriver,
  updateDriver: updateDriver,
  removeDriver: removeDriver
};

function getAllDrivers(req, res, next) {
  db.any('SELECT * From users WHERE role = "driver"')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Drivers'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleDriver(req, res, next) {
  var driverID = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE role = "driver" AND username = $1', driverID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved a driver'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createDriver(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('INSERT INTO users(username, password, name, age, sex, role)' +
      'values(${username}, ${password}, ${name}, ${age}, ${sex}, "driver")',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one driver'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateDriver(req, res, next) {
  db.none('UPDATE drivers SET username=$1, password=$2, name=$3, age=$4, sex=$5 where username=$6',
    [req.body.name, parseInt(req.body.age),
      req.body.sex, req.body.carNumber, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated driver'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeDriver(req, res, next) {
  var driverID = parseInt(req.params.id);
  db.result('DELETE FROM drivers WHERE username = $1', driverID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} driver`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
