describe('Home View', function() {
  it('should append addTaskView and taskListView', function() {
    var expectedTaskListClassName = 'task-list';
    var expectedAddTaskClassName = 'add-task-container';
    spyOn(app.view.TaskList.prototype, 'initialize');
    spyOn(app.view.AddTask.prototype, 'initialize');

    var homeView = new app.view.Home();
    expect(homeView.$el).toContain('.' + expectedAddTaskClassName);
    expect(homeView.$el).toContain('.' + expectedTaskListClassName);
  });
});