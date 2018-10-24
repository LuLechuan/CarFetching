const express = require('express');
const router = express.Router();

const login = require('../login');

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Vber'
  });
});

router.get('/logout', login.logout);

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

module.exports = router;
