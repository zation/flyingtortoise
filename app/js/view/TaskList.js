app.view.TaskList = Backbone.View.extend({
  render: function() {
    var taskListView = this;
    this.collection.each(function(task) {
      taskListView.addTask(task);
    });
  },
  addTask: function(task) {
    var taskSummaryView = new app.view.TaskSummary({
      model: task
    });
    this.$el.append(taskSummaryView.$el);
  },
  initialize: function() {
    this.render();
    this.collection.on('add', this.addTask, this);
  }
});