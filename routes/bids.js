const express = require('express');
const router = express.Router();
const db = require('../db_connection');
const login = require('../login');

const passenger = require('../passenger_queries');

router.get('/', login.ensureAuthentication, passenger.getBids);

router.get('/:bid_id', login.ensureAuthentication, passenger.getSingleBid);

router.post('/add', login.ensureAuthentication, passenger.createBid);

router.get('/edit/:bid_id', login.ensureAuthentication, passenger.getEditPage);

router.post('/edit', login.ensureAuthentication, passenger.updateBid);

router.get('/delete/:bid_id', login.ensureAuthentication, passenger.deleteBid);

module.exports = router;
