var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:pass@localhost:5432/drivers';
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
  db.any('SELECT * From drivers')
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
  db.one('SELECT * FROM drivers WHERE id = $1', driverID)
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
  db.none('INSERT INTO drivers(id, name, age, sex, carNumber)' +
      'values(${id}, ${name}, ${age}, ${sex}, ${carNumber})',
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
  db.none('UPDATE drivers SET name=$1, age=$2, sex=$3, carNumber=$4 where id=$5',
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
  db.result('DELETE FROM drivers WHERE id = $1', driverID)
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
