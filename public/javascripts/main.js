'use strict';

var FeedReader = {
  Models: FeedReaderModels,
  Views: FeedReaderViews,
  Router: FeedReaderRouter
};

// Initialize App
(function() {
  $(function() {

    FeedReader.feeds = new FeedReader.Models.Feeds();

    FeedReader.router = new FeedReader.Router();
    Backbone.history.start();

  });
})();
