'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
  name: String,
  source: String,
  id: Number
});

module.exports = mongoose.model('Feed', FeedSchema);
