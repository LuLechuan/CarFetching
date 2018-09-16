var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/drivers', db.getAllDrivers);
router.get('/api/drivers/:id', db.getSingleDriver);
router.post('/api/drivers', db.createDriver);
router.put('/api/drivers/:id', db.updateDriver);
router.delete('/api/drivers/:id', db.removeDriver);

module.exports = router;
