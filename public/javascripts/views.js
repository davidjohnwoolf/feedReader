'use strict';

var FeedReaderViews = (function() {

  var Feed = Backbone.View.extend({
    className: 'feed',
    render: function() {
      var name = '<h4><a href="#' + this.model.get('_id') + '">' + this.model.get('name') + '</a></h4>';
      var source = '<p>' + this.model.get('source') + '</p>';
      var editLink = '<a href="#' + this.model.get('_id') + '/edit">Edit</a>';
      var deleteButton = '<button id="delete-feed">Delete</button>';
      this.$el.html(name + source + editLink + deleteButton);
      return this;
    },
    initialize: function() {
      this.listenTo(this.model, 'destroy', this.removeView);
    },
    events: {
      'click #delete-feed': 'deleteFeed'
    },
    removeView: function() {
      this.remove();
      FeedReader.router.navigate('', { trigger: true });

    },
    deleteFeed: function() {
      this.model.destroy();
    }
  });

  var NewFeed = Backbone.View.extend({
    id: 'new-feed',
    render: function() {
      var feedName = '<input id="feed-name" type="text" name="name">';
      var feedSource = '<input id="feed-source" type="text" name="source">';
      var createFeed = '<button id="create-feed">Create Feed</button>'
      this.$el.html(feedName + feedSource + createFeed);
      return this;
    },
    events: {
      'click #create-feed': 'createFeed'
    },
    createFeed: function() {
      FeedReader.feeds.create({ name: $('#feed-name').val(), source: $('#feed-source').val() });
      FeedReader.router.navigate('', { trigger: true });
    }
  });

  var EditFeed = Backbone.View.extend({
    id: 'edit-feed',
    render: function() {
      var editFeedName = '<input id="edit-feed-name" type="text" name="name"value="' + this.model.get('name') + '">';
      var editFeedSource = '<input id="edit-feed-source" type="text" name="source" value="' + this.model.get('source') + '">';
      var updateFeed = '<button id="update-feed">Update Feed</button>'
      this.$el.html(editFeedName + editFeedSource + updateFeed);
      return this;
    },
    events: {
      'click #update-feed': 'updateFeed'
    },
    updateFeed: function() {
      this.model.set('name', $('#edit-feed-name').val());
      this.model.set('source', $('#edit-feed-source').val());
      this.model.save();
      FeedReader.router.navigate('', { trigger: true });
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
      }, this);
      return this;
    },
    initialize: function() {
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'destroy', this.render);
      this.listenTo(this.collection, 'route', this.collection.initialize());
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
