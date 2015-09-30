'use strict';

var FeedReaderViews = (function() {

  var Feed = Backbone.View.extend({
    className: 'feed',
    render: function() {
      var name = '<h4><a href="#' + this.model.get('_id') + '">' + this.model.get('name') + '</a></h4>';
      var source = '<p>' + this.model.get('source') + '</p>';
      var editLink = '<a href="#' + this.model.get('_id') + '/edit">Edit</a>';
      this.$el.html(name + source + editLink);
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
      var form = '<form method="post" action="/' + this.model.get('_id') + '/edit"><input type="hidden" name="_method" value="PUT" type="text"><input name="name" id="edit-name" type="text"><input name="source" id="edit-source" type="text"><input type="submit"></form>';
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
        console.log(feed);
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
