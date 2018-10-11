const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Vber'
  });
});

// router.get('/drivers/add', (req, res, next) => {
//   res.render('add_driver', {title: 'Create Driver'});
//   console.log(req)
// });

// router.get('/api/users', db.getAllDrivers);
// router.get('/api/drivers/:id', db.getSingleDriver);
// router.post('/api/drivers', db.createDriver);
// router.put('/api/drivers/:id', db.updateDriver);
// router.delete('/api/drivers/:id', db.removeDriver);

module.exports = router;
