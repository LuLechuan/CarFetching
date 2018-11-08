const express = require('express');
const router = express.Router();
const login = require('../login');

const passenger = require('../passenger_queries');

router.get('/rides', login.ensureAuthentication, passenger.getRides);

router.get('/bids/add/:ride_id', login.ensureAuthentication, (req, res, next) => {
  var ride_id = parseInt(req.params.ride_id);
  res.render('add_bid', {title: 'Create Bid', ride_id: ride_id});
});

router.get('/bids', login.ensureAuthentication, passenger.getBids);

router.get('/bids/edit/:id', login.ensureAuthentication, (req, res, next) => {
  res.render('edit_bid', {title: 'Update Bid'});
});

router.get('/history', login.ensureAuthentication, passenger.viewHistory);

module.exports = router;
