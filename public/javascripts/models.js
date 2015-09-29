'use strict';

var FeedReaderModels = (function() {

  var Feed = Backbone.Model.extend({

  });

  var Feeds = Backbone.Collection.extend({
    model: Feed
  });

  return {
    Feed: Feed,
    Feeds: Feeds
  };
})();
