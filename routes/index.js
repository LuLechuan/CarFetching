const express = require('express');
const router = express.Router();

const login = require('../login');

router.get('/', login.ensureAuthentication, (req, res, next) => {
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

router.post('/signUp', login.signUp);
router.post('/loginAction', login.loginAction);

module.exports = router;
