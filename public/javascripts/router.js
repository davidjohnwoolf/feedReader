'use strict';

var FeedReaderRouter = (function() {

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'new': 'new',
      ':id': 'show',
      ':id/edit': 'edit'
    },
    index: function() {
      var feedsView = new FeedReader.Views.Feeds({ collection: FeedReader.feeds });
      $('#app').html(feedsView.render().$el);
    },
    new: function() {
      var newFeedView = new FeedReader.Views.NewFeed();
      $('#app').html(newFeedView.render().$el);
    },
    show: function(id) {
      var feed = FeedReader.feeds.get(id);
      var feedView = new FeedReader.Views.Feed({ model: feed });
      $.ajax({
        url: '/fb/' + id
      }).done(function( data ) {
        var feedData = data;
        var feedData = JSON.parse(feedData);
        var feedContents = '';
        for (var i = 0; i < feedData.feed.data.length; i++) {
          feedContents += '<h4>' + feedData.feed.data[i].message + '</h4>'
        }
        $('#app').html(feedView.render().$el);
        $('#app').append(feedContents);
      });
    },
    edit: function(id) {
      var feed = FeedReader.feeds.get(id);
      var editFeedView = new FeedReader.Views.EditFeed({ model: feed });
      $('#app').html(editFeedView.render().$el);
      $('#edit-name').val(feed.get('name'));
      $('#edit-source').val(feed.get('source'));
    }
  });

  return Router;
})();
