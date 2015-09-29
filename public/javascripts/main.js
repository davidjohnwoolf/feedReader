'use strict';

var FeedReader = {
  Models: FeedReaderModels,
  Views: FeedReaderViews,
  Router: FeedReaderRouter
};

// Initialize App
(function() {
  $(function() {

    FeedReader.feeds = new FeedReader.Models.Feeds([
      { name: 'Web Design', source: 'webdesign.com/rss' },
      { name: 'Left News', source: 'leftnews.com/rss' },
      { name: 'Linux', source: 'linux.com/rss' }
    ]);

    var router = new FeedReader.Router;
    Backbone.history.start();


  });
})();
