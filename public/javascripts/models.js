'use strict';

var FeedReaderModels = (function() {

  var Feed = Backbone.Model.extend({

  });

  var Feeds = Backbone.Collection.extend({
    model: Feed,
    url: '/feeds',
    initialize: function() {
      this.fetch({ async: false });
    }
  });

  return {
    Feed: Feed,
    Feeds: Feeds
  };
})();
