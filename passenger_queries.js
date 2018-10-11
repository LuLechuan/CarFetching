var db = require('./db_connection');

// add query functions

module.exports = {
  getBids: getBids,
  createBid: createBid
};

function getBids(req, res, next) {
  db.any('SELECT * From bids')
    .then(function (data) {
      const sources = data.map(d => d.source);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Bids'
        });
      res.render('bids', {sources: sources});
    })
    .catch(function (err) {
      return next(err);
    });
}

function createBid(req, res, next) {
  req.body.amount = parseInt(req.body.amount);
  // req.body.start_time = Date.parse(req.body.start_time) / 1000;
  console.log(req.body);
  const query = 'INSERT INTO bids(passenger, car, start_time, source, destination, amount, status) ' +
      'values(${passenger}, ${car}, to_timestamp(${start_time}), ${source}, ${destination}, ${amount}, \'pending\')';
  console.log(query);
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
