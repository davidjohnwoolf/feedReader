var express = require('express');
var router = express.Router();
var methodOverride = require('method-override');

var Feed = require('../models/feed.js')

// router middleware
router.use(methodOverride(function(req, res) {
  // check for _method property in form requests
  // see hidden input field in views
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// index
router.get('/', function(req, res) {

});

// new
router.get('/new', function(req, res) {

});

// create
router.post('/new', function(req, res) {

});

// show
router.get('/:id', function(req, res) {

});

// edit
router.get('/:id/edit', function(req, res) {

});

// update
router.post('/:id/edit', function(req, res) {

});

// delete
router.delete('/:id', function(req, res) {

});
