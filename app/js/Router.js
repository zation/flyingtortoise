app.Router = Backbone.Router.extend({
  routes: {
    'time/:id': 'time'
  },

  time: function(id) {
    app.Event.trigger(app.Event.TaskStart, this.manager.mainCollection.get(id));
  },

  initialize: function() {
    this.manager = new app.Manager();
    Backbone.history.start();
  }
});