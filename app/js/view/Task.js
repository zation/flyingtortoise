app.view.Task = Backbone.View.extend({
  className: 'task',
  tagName: 'li',
  events: {
    'click .start': 'startTask'
  },
  startTask: function() {
    this.$el.hide();
    app.Event.trigger(app.Event.TaskStart, this.model);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  },
  initialize: function() {
    this.template = _.template($('#task').html());
    this.render();
  }
});