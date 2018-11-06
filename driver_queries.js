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
  const rideOwner = login.currentuser;
  const ride_id = req.body.ride_id;
  const car = req.body.car;
  const start_time = req.body.start_time;
  const source = req.body.source;
  const destination = req.body.destination;
  const number_passenger = req.body.number_passenger;
  const status = req.body.status;

  db.none('INSERT INTO rides (rideOwner, ride_id, car, start_time, source, destination, number_passenger, status) values ($1, $2, $3, $4, $5, $6, $7, $8)',
    [rideOwner, ride_id, car, start_time, source, destination, number_passenger, status])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created a ride'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

// DONE
function ownBids(req, res, next) {
    const rideOwner = currentUser;
    db.any('SELECT * FROM bids WHERE car IN (SELECT plate_number FROM cars WHERE driver = $1) AND status = \'pending\'', rideOwner)
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
    bid_id = req.params.bid_id;
    db.result('UPDATE bids SET status = \'success\' WHERE bid_id = $1', bid_id)
    .catch(function (err) {
        return next(err);
    });
    db.result('UPDATE bids SET status = \'failed\' WHERE bid_id <> $1 AND car IN (SELECT car FROM bids WHERE bid_id = $1)', bid_id)
    .catch(function (err) {
        return next(err);
    });
    db.result('UPDATE rides SET status = \'success\' WHERE car IN (SELECT car FROM bids WHERE bid_id = $1)', bid_id)
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
