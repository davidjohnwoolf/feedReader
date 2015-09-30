'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Feed = require('./models/feed')

var app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 1337);

mongoose.connect('mongodb://localhost/feedReader');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/feeds', function(req, res) {
  Feed.find(function(err, feeds) {
    if (err) return res.send(err);

    res.send(JSON.stringify(feeds));
  });
});

app.post('/new', function(req, res) {
  console.log('Created');
  Feed.count({}, function(err, count) {
    if (err) return res.send(err);

    var feed = new Feed({
      name: req.body.name,
      source: req.body.source,
      id: count
    });

    feed.save(function(err) {
      if (err) return res.send(err);

      res.redirect('/');
    });
  });
});

// error handling

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'));
console.log('Listening...');
