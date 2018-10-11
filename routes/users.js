const express = require('express');
const router = express.Router();
const db = require('../db_connection');

router.get('/', (req, res, next) => {
    db.any('SELECT * FROM users')
        .then((data) => {
            const users = data;
            console.log(users);
            res.render('users', {users: users});
        })
        .catch((err) => {
            return next(err);
        });
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

router.post('/', function(req, res, next) {
    console.log(req.body.username);
    db.none('INSERT INTO users VALUES(${username}, ${password}, ${name}, ${age}, ${sex}, ${role})', req.body)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.put('/:username', (req, res, next) =>{
    db.none('UPDATE users SET password= $1, name=$2, age=$3, sex=$4, role=$5 where username=$5',
        [req.body.password, req.body.name, req.body.age,
            req.body.sex, req.body.role, req.params.username])
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated a driver'
                });
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/:username', (req, res, next) => {
    const username = req.params.username;
    db.none('DELETE FROM users WHERE username = $1', username)
        .then(() => {
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed a user`
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;
