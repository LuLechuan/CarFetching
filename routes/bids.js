const express = require('express');
const router = express.Router();
const db = require('../db_connection');

const passenger = require('../passenger_queries');

router.get('/', passenger.getBids);

router.get('/:bid_id', passenger.getSingleBid);

router.post('/add', passenger.createBid);

// router.put('/edit', passengers.updateBid);

module.exports = router;
