var db = require('./db_connection');
var login = require('./login');

// add query functions

module.exports = {
    getRides: getRides,
    getBids: getBids,
    getSingleBid: getSingleBid,
    createBid: createBid,
    getEditPage: getEditPage,
    updateBid: updateBid,
    deleteBid: deleteBid,
    viewHistory: viewHistory
};

function getRides(req, res, next) {
  if (req.query.search == null || req.query.search == '') {
    db.any('SELECT * From rides WHERE status = \'pending\'')
      .then(function (data) {
        const rides = data.map(r => r);
        res.render('passenger_view_rides', {rides: rides});
      })
      .catch(function (err) {
        return next(err);
      });
  } else {
    var searchKey = req.query.search;
    query = 'SELECT * From rides r WHERE r.status = \'pending\' AND (r.source LIKE \'%' + searchKey + '%\' OR r.destination LIKE \'%' + searchKey + '%\')'
    db.any(query)
      .then(function (data) {
        const rides = data.map(r => r);
        res.render('passenger_view_rides', {rides: rides});
      })
      .catch(function (err) {
        return next(err);
      });
  }
}

function getBids(req, res, next) {
    db.any('SELECT * From bids WHERE passenger = $1 AND status = \'pending\'', currentUser)
    .then(function (data) {
        const bids = data.map(d => d);

        res.render('bids', {bids: bids});
    })
    .catch(function (err) {
        return next(err);
    });
}

function getSingleBid(req, res, next) {
    var bid_id = parseInt(req.params.bid_id);
    db.one('SELECT * FROM bids WHERE bid_id = $1', bid_id)
    .then(function (data) {
        res.render('bid', {bid: data});
    })
    .catch(function (err) {
        return next(err);
    });
}

function createBid(req, res, next) {
    req.body.ride_id = parseInt(req.body.ride_id);
    const passenger = currentUser;
    const amount = req.body.amount;
    req.checkBody('amount', "Amount should be a number").optional().matches("[0-9]+");

    let errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.render('add_bid', {
            title: 'Create Bid',
            ride_id: req.body.ride_id,
            errors: errors
        });
    } else {
        db.task(t => {
            return t.batch([
                t.one('SELECT * FROM rides WHERE ride_id=$1', req.body.ride_id),
                t.one('SELECT MAX(bid_id) FROM bids')])
                .then(data => {
                    var ride = data[0];
                    var bid_id = parseInt(data[1].max) + 1;
                    if (ride) {
                        const query = 'INSERT INTO bids(bid_id, passenger, car, start_time, source, destination, amount, status) ' +
                        'values($1, $2, $3, $4, $5, $6, $7, \'pending\')';
                        return t.none(query,
                            [bid_id, passenger, ride.car, ride.start_time, ride.source, ride.destination, amount]);
                        }
                        return [];
                    });
                })
        .then(events => {
            res.redirect('/passengers/bids');
        })
        .catch(error => {
            return next(error);
        });
    }
}

function getEditPage(req, res, next) {
    const bid_id = parseInt(req.params.bid_id);
    res.render('edit_bid', {title: 'Edit Bid', bid_id: bid_id});
}

function updateBid(req, res, next) {
    db.none('UPDATE bids SET amount = $1 where bid_id=$2',
    [parseInt(req.body.amount), parseInt(req.body.bid_id)])
    .then(function () {
        res.redirect('/passengers/bids');
    })
    .catch(function (err) {
        return next(err);
    });
}

function deleteBid(req, res, next) {
    const bid_id = req.params.bid_id;
    db.result('DELETE FROM bids WHERE bid_id = $1', bid_id)
    .then(function (result) {
        res.redirect('/passengers/bids');
    })
    .catch(function (err) {
        return next(err);
    });
}

function viewHistory(req, res, next) {
    db.any('SELECT * From bids WHERE passenger = $1', currentUser)
    .then(function (data) {
        const bids = data.map(d => d);

        res.render('passengerHistory', {bids: bids});
    })
    .catch(function (err) {
        return next(err);
    });
}
