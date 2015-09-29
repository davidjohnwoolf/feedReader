'use strict';

var FeedReader = {
  Models: FeedReaderModels,
  Views: FeedReaderViews,
  Router: FeedReaderRouter
};

// Initialize App
(function() {
  $(function() {

      var router = new FeedReader.Router;
      Backbone.history.start();

  });
})();
