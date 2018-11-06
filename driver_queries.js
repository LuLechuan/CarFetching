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
    db.one('SELECT car, start_time, source, destination FROM bids WHERE bid_id = $1', bid_id)
    .then(data => {
        car = data[0];
        start_time = data[1];
        source = data[2];
        destination = data[3];
    })
    .catch(function (err) {
        return next(err);
    });

    db.result('UPDATE bids SET status = \'failed\' WHERE car = $1 AND start_time = $2 AND source = $3 AND destination = $4 AND bid_id <> $5', car, start_time, source, destination, bid_id)
    .catch(function (err) {
        return next(err);
    });
    db.result('UPDATE rides SET status = \'success\' WHERE car = $1 AND start_time = $2 AND source = $3 AND destination = $4', car, start_time, source, destination)
    .then(function (result) {
        res.redirect('/bids');
    })
    .catch(function (err) {
        return next(err);
    });
}

// function updateBid(req, res, next) {
//   db.none('UPDATE bids SET amount = $1 where id=$2',
//     [parseInt(req.body.amount), parseInt(req.params.id)])
//     .then(function () {
//       res.status(200)
//         .json({
//           status: 'success',
//           message: 'Updated driver'
//         });
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }
