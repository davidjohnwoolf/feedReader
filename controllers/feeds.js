'use strict';

var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

var Feed = require('../models/feed.js')

// router middleware
router.use(methodOverride(function(req, res) {
  // check for _method property on form submit
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// create
router.post('/new', function(req, res) {
  var feed = new Feed({
    name: req.body.name,
    source: req.body.source
  });

  feed.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.redirect('/feeds');
  });
});

// update
router.post('/:id/edit', function(req, res) {
  Feed.findById(req.params.id, function(err, feed) {
    if (err) {
      return res.send(err);
    }

    for (var key in req.body) {
      feed[key] = req.body[key];
    }

    feed.save(function(err) {
      if (err) {
        return res.send(err)
      }

      res.redirect('feeds/' + feed._id);
    });
  });
});

// delete
router.delete('/:id', function(req, res) {
  Feed.remove({ _id: req.params.id }, function(err, feed) {
    if (err) {
      return res.send(err);
    }

    res.redirect('/feeds');
  });
});
