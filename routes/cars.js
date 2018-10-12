const express = require('express');
const router = express.Router();
const db = require('../db_connection');

router.get('/', (req, res, next) => {
    db.any('SELECT * FROM cars')
        .then((data) => {
            const cars = data;
            console.log(cars);
            res.render('cars', {cars : cars});
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/:number', (req, res, next) => {
    const plate_number = req.params.number;
    db.one('SELECT * FROM cars WHERE plate_number = ($1)', plate_number)
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a car'
                });
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/', (req, res, next) => {
    db.none('INSERT INTO cars VALUES(${plate_number}, ${driver}, ${capacity}, ${model})', req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one car'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.put('/:number', (req, res, next) =>{
    db.none('UPDATE cars SET driver= $1, capacity=$2, model=$3 where plate_number=$4',
        [req.body.driver, parseInt(req.body.capacity), req.body.model, req.params.number])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated a car'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/:number', (req, res, next) => {
    const plate_number = req.params.number;
    db.none('DELETE FROM cars WHERE plate_number = $1', plate_number)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed a car`
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;
