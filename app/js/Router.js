app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'time/:id': 'time'
  },

  home: function() {
    app.Event.trigger(app.Event.TaskStop);
    console.log(111);
  },

  time: function(id) {
    app.Event.trigger(app.Event.TaskStart, this.manager.mainCollection.get(id));
  },

  goTo: function(path) {
    location.href = path;
  },

  initialize: function() {
    var router = this;
    this.manager = new app.Manager();
    app.Event.on(app.Event.TaskStop, function() {
      router.goTo('#');
    });
  }
});