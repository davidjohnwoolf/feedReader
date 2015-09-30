'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Feed = require('./models/feed')

var app = express();

app.disable('x-powered-by');
app.set('port', process.env.PORT || 1337);

mongoose.connect('mongodb://localhost/feedReader');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res) {
  // check for _method property on form submit
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.get('/feeds', function(req, res) {
  Feed.find(function(err, feeds) {
    if (err) return res.send(err);

    res.json(feeds);
  });
});

app.post('/new', function(req, res) {
  var feed = new Feed({
    name: req.body.name,
    source: req.body.source,
  });

  feed.save(function(err) {
    if (err) return res.send(err);

    res.redirect('/');
  });
});

app.put('/:id/edit', function(req, res) {
  Feed.findById(req.params.id, function(err, feed) {
    if (err) return res.send(err);

    for (var key in req.body) {
      feed[key] = req.body[key];
    }

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
