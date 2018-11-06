const express = require('express');
const router = express.Router();
const db = require('../db_connection');

router.get('/', ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM users ORDER BY users.username')
        .then((data) => {
            res.render('admin', {users: data});
        })
        .catch((err) => {
            return next(err);
        })
});

router.get('/:username', (req, res, next) => {
    const username = req.params.username;
    db.one('SELECT * FROM users WHERE username = ($1)', username)
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved a user'
                });
        })
        .catch(err => {
            return next(err);
        });
});

router.get('/edit/:username', (req, res, next) => {
    const username = req.params.username;
    db.one('SELECT * FROM users WHERE username = ($1)', username)
        .then(data => {
            res.render('edit_user', {user: data});
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/', (req, res, next) => {
    db.none('INSERT INTO users VALUES(${username}, ${password}, ${name}, ${age}, ${sex}, ${role})', req.body)
        .then(() => {
            res.redirect('/admin/')
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/edit/:username', (req, res, next) =>{
    db.none('UPDATE users SET password= $1, name=$2, age=$3, sex=$4, role=$5 where username=$6',
        [req.body.password, req.body.name, req.body.age, req.body.sex, req.body.role, req.params.username])
        .then(() => {
            res.redirect('/admin/');
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/:username', (req, res, next) => {
    const username = req.params.username;
    db.none('DELETE FROM users WHERE username = $1', username)
        .then(() => {
            console.log('DELETE!!');
            res.send('success');
        })
        .catch((err) =>{
            return next(err);
        });
});

function ensureAuthentication(req, res, next) {
    if (currentUser == null) {
        res.redirect('/');
        req.flash('error_msg', 'Please login first');
    } else if (currentUser == 'driver') {
        res.redirect('/driverHome');
    } else if (currentUser == 'passenger') {
        res.redirect('/passengerHome');
    } else {
        next();
    }
}

module.exports = router;
