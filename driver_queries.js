var db = require('./db_connection');

// add query functions

module.exports = {
  createRide: createRide
  // updateBid: updateBid
};

function createRide(req, res, next) {
  const ride_id = req.body.ride_id;
  const car = req.body.car;
  const start_time = req.body.start_time;
  const source = req.body.source;
  const destination = req.body.destination;
  const number_passenger = req.body.number_passenger;
  const status = req.body.status;

  db.none('INSERT INTO rides (ride_id, car, start_time, source, destination, number_passenger, status) values ($1, $2, $3, $4, $5, $6, $7)',
    [ride_id, car, start_time, source, destination, number_passenger, status])
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
