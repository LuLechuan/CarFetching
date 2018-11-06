const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const login = require('../login');

const driver_queries = require('../driver_queries');

router.get('/', login.ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM rides WHERE status = \'pending\'')
        .then((data) => {
            const rides = data;
            res.render('rides', {rides : rides});
        })
        .catch((err) => {
            return next(err);
        });
});

// DONE
router.get('/add_ride', (req, res, next) => {
    res.render('add_ride', {
      title: 'Create ride'
    });
})

// DONE
router.get('/own_rides', (req, res, next) => {
    const rideOwner = currentUser;
    db.any('SELECT * FROM rides WHERE car IN (SELECT plate_number FROM cars WHERE driver = $1) AND status = \'pending\'', rideOwner)
        .then((data) => {
            const rides = data;
            res.render('own_rides', {rides : rides});
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/:ride_id', login.ensureAuthentication, (req, res, next) => {
  var ride_id = parseInt(req.params.ride_id);
  db.one('SELECT * FROM rides WHERE ride_id = $1', ride_id)
    .then(function (data) {
      const ride = data;
      res.render('ride', {ride : ride});
    })
    .catch(function (err) {
      return next(err);
    });
});

// couldn't get this to work yet
router.get('/:car/:start_time/:source/destination', (req, res, next) => {
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    db.one('SELECT * FROM rides WHERE car = ($1) AND start_time = ($2) AND source = ($3) AND destination = ($4)'
        , [car, start_time, source, destination])
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a ride'
                });
        })
        .catch(err => {
            return next(err);
        });
});

//DONE
router.post('/createRide', driver_queries.createRide);

router.post('/', (req, res, next) => {
    db.none('INSERT INTO rides VALUES(${ride_id}, ${car}, ${start_time}, ${source}, ${destination}, ${number_passenger}, ${status})', req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one ride'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.put('/:car/:start_time/:source/destination', (req, res, next) =>{
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    const status = req.body.status;
    const number_passenger = req.body.number_passenger;
    db.none('UPDATE rides SET number_passenger=$1, status=$2, car = $3, start_time = $4, source = $5, destination = $6 where car=$3 AND start_time=$4 AND source=$5 AND destination=$6',
        [number_passenger, status, car, start_time, source, destination])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated a ride'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/:car/:start_time/:source/destination', (req, res, next) => {
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    db.none('DELETE FROM rides WHERE car = ($1) AND start_time = ($2) AND source = ($3) AND destination = ($4)'
        , [car, start_time, source, destination])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed a ride`
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;
