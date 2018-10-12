var db = require('./db_connection');

// add query functions

module.exports = {
  getBids: getBids,
  // getSingleBid: getSingleBid,
  createBid: createBid,
  updateBid: updateBid
};

function getBids(req, res, next) {
  db.any('SELECT * From bids')
    .then(function (data) {
      const bids = data.map(d => d);

      res.render('bids', {bids: bids});
    })
    .catch(function (err) {
      return next(err);
    });
}

// function getSingleBid(req, res, next) {
//   var bidID = parseInt(req.params.id);
//   db.one('SELECT * FROM drivers WHERE id = $1', bidID)
//     .then(function (data) {
//       const bids = data.map(d => d);
//       const bid = bids[0];
//       res.render('bid', {bid: bid});
//     })
//     .catch(function (err) {
//       return next(err);
//     });
// }

function createBid(req, res, next) {
  req.body.bid_id = parseInt(req.body.bid_id);
  req.body.amount = parseInt(req.body.amount);
  // req.body.start_time = Date.parse(req.body.start_time);
  // const time = '2018-10-11 04:05:06'
  const query = 'INSERT INTO bids(bid_id, passenger, car, start_time, source, destination, amount, status) ' +
      'values(${bid_id}, ${passenger}, ${car}, ${start_time}, ${source}, ${destination}, ${amount}, \'pending\')';
  db.none(query,
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created Bid'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateBid(req, res, next) {
  db.none('UPDATE bids SET amount = $1 where id=$2',
    [parseInt(req.body.amount), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated driver'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
