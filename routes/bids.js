const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const login = require('../login');

const passenger = require('../passenger_queries');

router.get('/', login.ensureAuthentication, passenger.getBids);

router.get('/:bid_id', login.ensureAuthentication, passenger.getSingleBid);

router.post('/add', login.ensureAuthentication, passenger.createBid);

router.get('/edit/:bid_id', passenger.getEditPage);

router.post('/edit', passenger.updateBid);

module.exports = router;
