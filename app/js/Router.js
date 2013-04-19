app.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'time/:id': 'time'
  },

  initialize: function() {
    var router = this;
    this.manager = new app.Manager();
    app.Event.on(app.Event.TaskStop, function() {
      router.navigate('/');
    });
    app.Event.on(app.Event.TaskStart, function(model) {
      router.navigate('time/' + model.get('id'));
    });
  }
});