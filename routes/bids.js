const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const login = require('../login');

const passenger = require('../passenger_queries');

router.get('/', login.ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM bids')
        .then((data) => {
            const bids = data;
            res.render('bids', {bids : bids});
        })
        .catch((err) => {
            return next(err);
        });
});

// NEWLY ADDED BY ZC
router.get('/own_bids', login.ensureAuthentication, passenger.ownBids);

router.get('/:bid_id', login.ensureAuthentication, passenger.getSingleBid);

router.post('/add', login.ensureAuthentication, passenger.createBid);

router.get('/edit/:bid_id', login.ensureAuthentication, passenger.getEditPage);

router.post('/edit', login.ensureAuthentication, passenger.updateBid);

router.get('/delete/:bid_id', login.ensureAuthentication, passenger.deleteBid);

module.exports = router;
