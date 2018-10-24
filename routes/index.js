const express = require('express');
const router = express.Router();

const login = require('../login');

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Vber'
  });
});

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Sign Up'
  });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login'
  });
});

router.get('/passengerHome',(req, res, next) => {
  res.render('passengerHome',{
    title: 'PassengerHome'
  });
});

router.get('/driverHome',(req, res, next) => {
  res.render('driverHome',{
    title: 'driverHome'
  });
});

router.post('/signUp', login.signUp);
router.post('/loginAction', login.loginAction);

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
