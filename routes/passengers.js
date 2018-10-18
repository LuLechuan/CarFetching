const express = require('express');
const router = express.Router();

const passenger = require('../passenger_queries');

router.get('/rides', passenger.getRides);

router.get('/bids/add/:ride_id', (req, res, next) => {
  var ride_id = parseInt(req.params.ride_id);
  res.render('add_bid', {title: 'Create Bid', ride_id: ride_id});
});

router.get('/bids', (req, res, next) => {
  res.render('passenger_manage_bids', {title: 'Manage Bids'});
});

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
