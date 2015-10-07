'use strict';

var FeedReaderModels = (function() {

  var Feed = Backbone.Model.extend({
    idAttribute: '_id'
  });

  var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: '/feeds'
  });

  return {
    Feed: Feed,
    Feeds: Feeds
  };
})();
