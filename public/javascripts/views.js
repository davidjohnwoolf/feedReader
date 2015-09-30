'use strict';

var FeedReaderViews = (function() {

  var Feed = Backbone.View.extend({
    className: 'feed',
    render: function() {
      var name = '<h4>' + this.model.get('name') + '</h4>'
      var source = '<p>' + this.model.get('source') + '</p>'
      this.$el.html(name + source);
      return this;
    }
  });

  var NewFeed = Backbone.View.extend({
    id: 'new-feed',
    render: function() {
      var form = '<form method="post" action="/new"><input name="name" type="text"><input name="source" type="text"><input type="submit"></form>';
      this.$el.html(form);
      return this;
    }
  });

  var EditFeed = Backbone.View.extend({
    id: 'edit-feed',
    render: function() {
      var id = 5; // temp
      var form = '<form method="post" action="/' + id + '/edit"><input name="name" id="edit-name" type="text"><input name="source" id="edit-source" type="text"><input type="submit"></form>';
      this.$el.html(form);
      return this;
    }
  });

  var Feeds = Backbone.View.extend({
    id: 'feeds',
    render: function() {
      var header = '<h2>Feeds</h2>';
      this.$el.html(header);
      this.collection.each(function(feed) {
        var feedView = new FeedReader.Views.Feed({ model: feed });
        this.$el.append(feedView.render().$el);
      }, this)
      return this;
    },
    initialize: function() {
      this.listenTo(this.collection, 'add', this.addView);
    },
    addView: function(feed) {
      var feedView = new FeedReader.Views.Feed({ model: feed });
      this.$el.append(feedView.render().$el);
    }
  });

  return {
    Feed: Feed,
    NewFeed: NewFeed,
    EditFeed: EditFeed,
    Feeds: Feeds
  };
})();
