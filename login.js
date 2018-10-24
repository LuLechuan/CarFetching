var db = require('./db_connection');

// add query functions

module.exports = {
  signUp : signUp,
  loginAction : loginAction
};

function signUp(req, res, next) {
  const age = parseInt(req.body.age);
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const sex = req.body.sex;
  const role = req.body.role;

  db.none('INSERT INTO users (username, password, name, sex, age, role) values ($1, $2, $3, $4, $5, $6)',
    [username, password, name, sex, age, role])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted One User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function loginAction(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  db.one('SELECT EXISTS (SELECT * FROM users u WHERE u.username = $1 AND u.password = $2 )',
   [username, password])
   .then(function (data) {
     if (data.exists) {
       res.redirect('/');
     }
   })
   .catch(function (err) {
     return next(err);
   });
}
