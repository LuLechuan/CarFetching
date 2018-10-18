const express = require('express');
const router = express.Router();
const db = require('../db_connection');

// const passenger = require('../passenger_queries');

// router.get('/', passenger.getBids);

// router.post('/add', passenger.createBid);

router.get('/', (req, res, next) => {
    db.any('SELECT * FROM bids')
        .then((data) => {
            const bids = data;
            console.log(bids);
            res.render('bids', {bids : bids});
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/:passenger/:car/:start_time/:source/destination', (req, res, next) => {
    const passenger = req.params.passenger;
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    db.one('SELECT * FROM bids WHERE passenger = ($1) AND car = ($2) AND start_time = ($3) AND source = ($4) AND destination = ($5)'
        , [passenger, car, start_time, source, destination])
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a bid'
                });
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/', (req, res, next) => {
    db.none('INSERT INTO bids VALUES(${passenger}, ${car}, ${start_time}, ${source}, ${destination}, ${amount}, ${status})', req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one bid'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.put('/:passenger/:car/:start_time/:source/destination', (req, res, next) =>{
    const passenger = req.params.passenger;
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    const amount = req.params.amount;
    const status = req.params.status;
    db.none('UPDATE bids SET amount=$1, status=$2 where passenger=$3 AND car=$4 AND start_time=$5 AND source=$6 AND destination=$7',
        [amount, status, passenger, car, start_time, source, destination])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated a bid'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/:passenger/:car/:start_time/:source/destination', (req, res, next) => {
    const passenger = req.params.passenger;
    const car = req.params.car;
    const start_time = req.params.start_time;
    const source = req.params.source;
    const destination = req.params.destination;
    db.none('DELETE FROM bids WHERE passenger = ($1) AND car = ($2) AND start_time = ($3) AND source = ($4) AND destination = ($5)'
        , [passenger, car, start_time, source, destination])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed a bid`
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

// router.put('/edit', passengers.updateBid);

module.exports = router;
