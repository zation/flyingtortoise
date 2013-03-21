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
    var taskView = new app.view.Task({
      model: task
    });
    this.addTaskView.$el.before(taskView.$el);
  },
  initialize: function() {
    this.addTaskView = new app.view.AddTask({
      collection: this.collection
    });
    this.render();
    this.collection.on('add', this.addTask, this);
  }
});