var db = require('./db_connection');
var login = require('./login');

// add query functions

module.exports = {
  createRide: createRide,
  ownBids: ownBids,
  acceptBid: acceptBid
  // updateBid: updateBid
};

function createRide(req, res, next) {
  const car = req.body.car;
  const start_time = req.body.start_time;
  const source = req.body.source;
  const destination = req.body.destination;
  const number_passenger = req.body.number_passenger;
  const status = 'pending';
  db.one('SELECT MAX(ride_id) FROM rides')
    .then(data => {
        var ride_id = parseInt(data.max) + 1;
        db.none('INSERT INTO rides (ride_id, car, start_time, source, destination, number_passenger, status) values ($1, $2, $3, $4, $5, $6, $7)',
          [ride_id, car, start_time, source, destination, number_passenger, status])
          .then(function () {
            res.redirect('/rides/own_rides')
            });
    })
    .catch(function (err) {
      return next(err);
    });
}

// DONE
function ownBids(req, res, next) {
    const rideOwner = currentUser;
    db.any('SELECT * FROM bids WHERE car IN (SELECT plate_number FROM cars WHERE driver = $1) AND status = \'pending\' ORDER BY amount DESC', rideOwner)
    .then(function (data) {
        const bids = data.map(d => d);
        res.render('own_bids', {bids: bids});
    })
    .catch(function (err) {
        return next(err);
    });
}

// DONE
function acceptBid(req, res, next) {
    var car;
    var start_time;
    var source;
    var destination;
    bid_id = req.params.bid_id;
    db.result('UPDATE bids SET status = \'success\' WHERE bid_id = $1', bid_id)
    .catch(function (err) {
        return next(err);
    });

    db.result('UPDATE bids SET status = \'failed\' WHERE car IN (SELECT car FROM bids WHERE bid_id = $1) AND start_time IN (SELECT start_time FROM bids WHERE bid_id = $1) AND source IN (SELECT source FROM bids WHERE bid_id = $1) AND destination IN (SELECT destination FROM bids WHERE bid_id = $1) AND bid_id <> $1', bid_id)
    .catch(function (err) {
        return next(err);
    });
    db.result('UPDATE rides SET status = \'success\' WHERE car IN (SELECT car FROM bids WHERE bid_id = $1) AND start_time IN (SELECT start_time FROM bids WHERE bid_id = $1) AND source IN (SELECT source FROM bids WHERE bid_id = $1) AND destination IN (SELECT destination FROM bids WHERE bid_id = $1)', bid_id)
    .then(function (result) {
        res.redirect('/bids');
    })
    .catch(function (err) {
        return next(err);
    });
}
