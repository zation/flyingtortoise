describe('Home View', function() {
  it('should append addTaskView and taskListView', function() {
    var originalTaskListClassName = app.view.TaskList.prototype.className;
    var originalAddTaskClassName = app.view.AddTask.prototype.className;
    this.after(function() {
      app.view.TaskList.prototype.className = originalTaskListClassName;
      app.view.AddTask.prototype.className = originalAddTaskClassName;
    });
    var expectedTaskListClassName = 'task-list';
    var expectedAddTaskClassName = 'add-task';
    app.view.TaskList.prototype.className = expectedTaskListClassName;
    app.view.AddTask.prototype.className = expectedAddTaskClassName;
    spyOn(app.view.TaskList.prototype, 'initialize');
    spyOn(app.view.AddTask.prototype, 'initialize');

    var homeView = new app.view.Home();
    expect(homeView.$el).toContain('.' + expectedAddTaskClassName);
    expect(homeView.$el).toContain('.' + expectedTaskListClassName);
  });
});