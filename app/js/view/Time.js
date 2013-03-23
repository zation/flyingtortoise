app.view.Time = Backbone.View.extend({
  className: 'time',
  events: {
    'click .stop': 'stopTask'
  },
  stopTask: function() {
    this.model.stop(moment());
    this.model.save();
    this.remove();
  },
  startTask: function(model) {
    this.$el.html(this.template(model.attributes));
    this.model = model;
    this.model.start(moment());
  },
  initialize: function() {
    this.template = _.template($('#time').html());
    app.Event.on(app.Event.TaskStart, this.startTask, this);
  }
});