describe('Home View', function() {
  it('should append addTaskView and taskListView', function() {
    var expectedTaskListClassName = 'task-list';
    spyOn(app.view.TaskList.prototype, 'initialize');

    var homeView = new app.view.Home();
    expect(homeView.$el).toContain('.' + expectedTaskListClassName);
  });
});