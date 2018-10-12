var db = require('./db_connection');

// add query functions

module.exports = {
  getBids: getBids,
  createBid: createBid
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

function createBid(req, res, next) {
  req.body.bid_id = parseInt(req.body.bid_id);
  req.body.amount = parseInt(req.body.amount);
  req.body.start_time = Date.parse(req.body.start_time);
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
