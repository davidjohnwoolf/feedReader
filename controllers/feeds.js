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
