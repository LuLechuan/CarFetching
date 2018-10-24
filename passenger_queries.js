var db = require('./db_connection');

// add query functions

module.exports = {
  getRides: getRides,
  getBids: getBids,
  getSingleBid: getSingleBid,
  createBid: createBid,
  getEditPage: getEditPage,
  updateBid: updateBid,
  deleteBid: deleteBid
};

function getRides(req, res, next) {
  // const currTime = new Date();
  db.any('SELECT * From rides')
    .then(function (data) {
      const rides = data.map(r => r);
      res.render('passenger_view_rides', {rides: rides});
    })
    .catch(function (err) {
      return next(err);
    });
}

function getBids(req, res, next) {
  db.any('SELECT * From bids WHERE passenger = $1', currentUser)
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
      res.redirect('/bids');
    })
    .catch(error => {
        return next(error);
    });
}

function getEditPage(req, res, next) {
  const bid_id = parseInt(req.params.bid_id);
  res.render('edit_bid', {title: 'Edit Bid', bid_id: bid_id});
}

function updateBid(req, res, next) {
  db.none('UPDATE bids SET amount = $1 where bid_id=$2',
    [parseInt(req.body.amount), parseInt(req.body.bid_id)])
    .then(function () {
      res.redirect('/bids');
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteBid(req, res, next) {
  const bid_id = req.params.bid_id;
  db.result('DELETE FROM bids WHERE bid_id = $1', bid_id)
    .then(function (result) {
      res.redirect('/bids');
    })
    .catch(function (err) {
      return next(err);
    });
}
