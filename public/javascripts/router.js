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
      // render feeds collection view
    },
    new: function() {
      // render new feed form
    },
    show: function() {
      // render feed show page
    },
    edit: function() {
      // render feed edit page
    }
  });

  return Router;
})();
