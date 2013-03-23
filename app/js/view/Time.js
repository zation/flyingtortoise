app.view.Time = Backbone.View.extend({
  className: 'time',
  events: {
    'click .stop': 'stopTask'
  },
  stopTask: function() {
    this.model.stop(moment());
    this.model.save();
    this.$el.hide();
    app.Event.trigger(app.Event.TaskStop);
  },
  startTask: function(model) {
    this.$el.html(this.template(model.attributes));
    this.$el.show();
    this.model = model;
    this.model.start(moment());
  },
  initialize: function() {
    this.template = _.template($('#time').html());
    this.$el.hide();
    app.Event.on(app.Event.TaskStart, this.startTask, this);
  }
});