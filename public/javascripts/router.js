'use strict';

var FeedReaderRouter = (function() {
  var Router = Backbone.Router.Extend({
    routes: {
      'new', 'new',
      'feeds/:id', 'show',
      'feeds/:id/edit', 'edit'
    }
  });

  return Router;
})();
