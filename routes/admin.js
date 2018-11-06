const express = require('express');
const router = express.Router();
const db = require('../db_connection');

/** Users **/
router.get('/users', ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM users ORDER BY users.username')
        .then((data) => {
            res.render('admin', {users: data});
        })
        .catch((err) => {
            return next(err);
        })
});

router.get('/users/edit/:username', (req, res, next) => {
    const username = req.params.username;
    db.one('SELECT * FROM users WHERE username = ($1)', username)
        .then(data => {
            res.render('edit_user', {user: data});
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/users', (req, res, next) => {
    db.none('INSERT INTO users VALUES(${username}, ${password}, ${name}, ${age}, ${sex}, ${role})', req.body)
        .then(() => {
            res.redirect('/admin/users')
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/users/edit/:username', (req, res, next) =>{
    db.none('UPDATE users SET password= $1, name=$2, age=$3, sex=$4, role=$5 where username=$6',
        [req.body.password, req.body.name, req.body.age, req.body.sex, req.body.role, req.params.username])
        .then(() => {
            res.redirect('/admin/users');
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/users/:username', (req, res, next) => {
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

/** Cars **/
router.get('/cars', ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM cars ORDER BY cars.plate_number')
        .then((data) => {
            res.render('admin_cars', {cars: data});
        })
        .catch((err) => {
            return next(err);
        })
});

router.get('/cars/edit/:plate_number', (req, res, next) => {
    const plate_number = req.params.plate_number;
    db.one('SELECT * FROM cars WHERE plate_number = ($1)', plate_number)
        .then(data => {
            res.render('admin_edit_cars', {car: data});
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/cars', (req, res, next) => {
    db.none('INSERT INTO cars VALUES(${plate_number}, ${driver}, ${capacity}, ${model})', req.body)
        .then(() => {
            res.redirect('/admin/cars')
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/cars/edit/:plate_number', (req, res, next) =>{
    db.none('UPDATE cars SET driver= $1, capacity=$2, model=$3 where plate_number=$4',
        [req.body.driver, req.body.capacity, req.body.model, req.params.plate_number])
        .then(() => {
            res.redirect('/admin/cars');
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/cars/:plate_number', (req, res, next) => {
    const plate_number = req.params.plate_number;
    db.none('DELETE FROM cars WHERE plate_number = $1', plate_number)
        .then(() => {
            console.log('DELETE!!');
            res.send('success');
        })
        .catch((err) =>{
            return next(err);
        });
});

/** Rides **/
router.get('/rides', ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM rides ORDER BY rides.ride_id')
        .then((data) => {
            res.render('admin_rides', {rides: data});
        })
        .catch((err) => {
            return next(err);
        })
});

router.get('/rides/edit/:ride_id', (req, res, next) => {
    const ride_id = req.params.ride_id;
    db.one('SELECT * FROM rides WHERE ride_id = ($1)', ride_id)
        .then(data => {
            res.render('admin_edit_rides', {ride: data});
        })
        .catch(err => {
            return next(err);
        });
});

router.post('/rides', (req, res, next) => {
    db.none('INSERT INTO rides (ride_id, car, start_time, source, destination, number_passenger, status) VALUES(${ride_id}, ${car}, ${start_time}, ${source}, ${destination}, ${number_passenger}, ${status})', req.body)
        .then(() => {
            res.redirect('/admin/rides')
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/rides/edit/:ride_id', (req, res, next) =>{
    db.none('UPDATE rides SET car = $1, start_time = $2, source = $3, destination = $4, number_passenger = $5, status = $6 where ride_id = $7',
        [req.body.car, req.body.start_time, req.body.source, req.body.destination, req.body.number_passenger, req.body.status, req.params.ride_id])
        .then(() => {
            res.redirect('/admin/rides');
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/rides/:ride_id', (req, res, next) => {
    const ride_id = req.params.ride_id;
    db.none('DELETE FROM rides WHERE ride_id = $1', ride_id)
        .then(() => {
            console.log('DELETE!!');
            res.send('success');
        })
        .catch((err) =>{
            return next(err);
        });
});

/** Bids **/
router.get('/bids', ensureAuthentication, (req, res, next) => {
    db.any('SELECT * FROM bids ORDER BY bids.bid_id')
        .then((data) => {
            res.render('admin_bids', {bids: data});
            //res.render('admin', {users:data});
        })
        .catch((err) => {
            return next(err);
        })
});

router.get('/bids/edit/:bid_id', (req, res, next) => {
    const bid_id = req.params.bid_id;
    db.one('SELECT * FROM bids WHERE bid_id = ($1)', bid_id)
        .then(data => {
            res.render('admin_edit_bids', {bid: data});
        })
        .catch(err => {
            return next(err);
        });
});


router.post('/bids', (req, res, next) => {
    db.none('INSERT INTO bids VALUES(${bid_id}, ${passenger}, ${car},${start_time}, ${source}, ${destination}, ${amount}, ${status})', req.body)
        .then(() => {
            res.redirect('/admin/bids')
        })
        .catch((err) => {
            return next(err);
        });
});

router.post('/bids/edit/:bid_id', (req, res, next) =>{
    db.none('UPDATE bids SET passenger = $1, car = $2, start_time = $3, source = $4, destination = $5, amount = $6, status = $7 where bid_id = $8',
        [req.body.passenger, req.body.car, req.body.start_time, req.body.source, req.body.destination, req.body.amount, req.body.status, req.params.bid_id])
        .then(() => {
            res.redirect('/admin/bids');
        })
        .catch((err) => {
            return next(err);
        });
});

router.delete('/bids/:bid_id', (req, res, next) => {
    const bid_id = req.params.bid_id;
    db.none('DELETE FROM bids WHERE bid_id = $1', bid_id)
        .then(() => {
            console.log('DELETE!!');
            res.send('success');
        })
        .catch((err) =>{
            return next(err);
        });
});

/** common **/
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
