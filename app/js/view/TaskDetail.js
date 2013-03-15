app.view.TaskDetail = Backbone.View.extend({
  className: 'task-detail',
  events: {
    'click .stop': 'stopTask'
  },
  stopTask: function() {
    this.model.stop(moment());
    this.model.save();
    this.remove();
  },
  render: function() {
    this.$el.append(this.template(this.model.attributes));
  },
  initialize: function() {
    this.template = _.template($('#task_detail').html());
    this.render();
  }
});