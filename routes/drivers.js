const express = require('express');
const router = express.Router();

const driver = require('../driver_queries');
const db = require('../db_connection');

router.get('/history', (req, res, next) => {
    db.any('SELECT * From rides WHERE car IN (SELECT plate_number FROM cars WHERE driver = $1) AND status = \'success\'', currentUser)
    .then((data) => {
        const rides = data;
        res.render('driver_history', {rides : rides});
    })
    .catch((err) => {
        return next(err);
    });
});

module.exports = router;
