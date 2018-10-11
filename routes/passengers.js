const express = require('express');
const router = express.Router();

router.get('/bids', (req, res, next) => {
  res.render('passenger_manage_bids', {title: 'Manage Bids'});
});

router.get('/bids/add', (req, res, next) => {
  res.render('add_bid', {title: 'Create Bid'});
  console.log(req)
});

router.get('/bids/edit/:id', (req, res, next) => {
  res.render('edit_bid', {title: 'Update Bid'});
});

router.get('/')

router.get('/')

var db = require('../passenger_queries');

// router.get('/bid/add', db.createBid);
// router.get('/rides', db.getAllRides);
// router.get('/bid', db.getBids);
// router.post('/bid', db.createBid);
// router.put('/bid/:id', db.updateBid);
// router.delete('/bid/:id', db.removeBid);

module.exports = router;
