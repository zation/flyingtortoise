app.view.TaskList = Backbone.View.extend({
  tagName: 'ul',
  className: 'task-list',
  render: function() {
    var taskListView = this;
    taskListView.$el.append(this.addTaskView.$el);
    this.collection.each(function(task) {
      taskListView.addTask(task);
    });
  },
  addTask: function(task) {
    var taskSummaryView = new app.view.TaskSummary({
      model: task
    });
    this.addTaskView.$el.before(taskSummaryView.$el);
  },
  initialize: function() {
    this.addTaskView = new app.view.AddTask({
      collection: this.collection
    });
    this.render();
    this.collection.on('add', this.addTask, this);
  }
});