const express = require('express');
const router = express.Router();

var passenger = require('../passenger_queries');

router.get('/', passenger.getBids);

router.post('/add', passenger.createBid);

module.exports = router;
