app.view.TaskSummary = Backbone.View.extend({
  className: 'task-summary',
  tagName: 'li',
  events: {
    'click .start': 'startTask'
  },
  startTask: function() {
    this.model.start(moment());
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  },
  initialize: function() {
    this.template = _.template($('#task_summary').html());
    this.render();
  }
});