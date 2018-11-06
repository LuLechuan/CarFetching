const express = require('express');
const router = express.Router();
const login = require('../login');

const passenger = require('../passenger_queries');

router.get('/rides', passenger.getRides);

router.get('/bids/add/:ride_id', (req, res, next) => {
  var ride_id = parseInt(req.params.ride_id);
  res.render('add_bid', {title: 'Create Bid', ride_id: ride_id});
});

router.get('/bids', login.ensureAuthentication, passenger.getBids);

router.get('/bids/edit/:id', (req, res, next) => {
  res.render('edit_bid', {title: 'Update Bid'});
});

// router.get('/bid/add', db.createBid);
// router.get('/rides', db.getAllRides);
// router.get('/bid', db.getBids);
// router.post('/bid', db.createBid);
// router.put('/bid/:id', db.updateBid);
// router.delete('/bid/:id', db.removeBid);

module.exports = router;
