const express = require('express');
const router = express.Router();
const db = require('../db_connection');

router.get('/', (req, res, next) => {
    db.any('SELECT * FROM cars WHERE driver = $1', currentUser)
        .then((data) => {
            const cars = data;
            console.log(cars);
            res.render('cars', {cars : cars});
        })
        .catch((err) => {
            return next(err);
        });
});

router.get('/addcar', (req, res, next) => {
  res.render('add_car', {
    title: 'Add a New Car'
  });
});

router.post('/add_car', (req, res, next) => {
  const capacity = parseInt(req.body.capacity);
  const plate_number = req.body.plate_number;
  const model = req.body.model;

  req.checkBody('plate_number', 'Plate number is required').notEmpty();
  req.checkBody('model', 'Model is required').notEmpty();
  req.checkBody('capacity', 'Capacity is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('add_car', {
      title: 'Add a New Car',
      errors: errors
    });
  } else {
    db.none('INSERT INTO cars (plate_number, driver, capacity, model) values ($1, $2, $3, $4)',
      [plate_number, currentUser, capacity, model])
      .then(function () {
        req.flash('success_msg', 'Car added sucessfully');
        res.redirect('/cars');
      })
      .catch(function (err) {
        return next(err);
      });
  }
});

router.get('/remove/:plate_number', (req, res, next) => {
    const plate_number = req.params.plate_number;
    console.log("Here")
    db.none('DELETE FROM cars WHERE plate_number = $1', plate_number)
        .then(() => {
            res.redirect('/cars');
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;
