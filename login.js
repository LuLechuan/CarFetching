var db = require('./db_connection');

// add query functions

module.exports = {
  signUp : signUp,
  loginAction : loginAction,
  logout: logout,
  ensureAuthentication: ensureAuthentication
};

function signUp(req, res, next) {
  const age = parseInt(req.body.age);
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;
  const sex = req.body.sex;
  const role = req.body.role;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do no match').equals(password);
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('sex', 'Sex field is required').notEmpty();
  req.checkBody('age', 'Age is required').notEmpty();
  req.checkBody('role', 'Role is required').notEmpty();

  let errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.render('register', {
      title: 'Sign Up',
      errors: errors
    });
  } else {
    db.none('INSERT INTO users (username, password, name, sex, age, role) values ($1, $2, $3, $4, $5, $6)',
      [username, password, name, sex, age, role])
      .then(function () {
        req.flash('success_msg', 'You are registered and can login');
        res.redirect('/');
      })
      .catch(function (err) {
        return next(err);
      });
  }
}

function loginAction(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  db.one('SELECT EXISTS (SELECT * FROM users u WHERE u.username = $1 AND u.password = $2 )',
   [username, password])
   .then(function (data) {
     if (data.exists) {
       db.one('SELECT * FROM users WHERE username=$1', username)
       .then(function(user) {
         req.flash('success_msg', 'Login Successful!');
         currentUser = username;
         userrole = user.role;
         if (userrole == 'driver') {
           currentDriver = userrole;
           res.redirect('/driverHome');
         } else {
           currentPassenger = userrole;
           res.redirect('/passengerHome');
         }
       })
       .catch(function (err) {
         return next(err);
       });
     } else {
       let errors = [{ param: 'passwordMismatch', msg: 'Invalid Username or Password', value: '' }];
       res.render('login', {title: 'Login', errors: errors});
     }
   })
   .catch(function (err) {
     return next(err);
   });
}

function logout(req, res, next) {
  currentUser = null;
  currentDriver = null;
  currentPassenger = null;
  req.flash('success_msg', 'Logout Success');
  res.redirect('/');
}

function ensureAuthentication(req, res, next) {
  if (currentUser == null) {
    res.redirect('/login');
    req.flash('error_msg', 'Please login first');
  } else {
    next();
  }
}
