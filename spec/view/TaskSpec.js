describe('TaskSummary View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var taskView = new app.view.Task({
      model: new app.model.Task({name: expectedName})
    });

    expect(taskView.$el).toHaveClass('task');
    expect(taskView.$el.find('.task-name')).toHaveText(expectedName);
  });

  it('should start task when click start button', function() {
    var taskModel = new app.model.Task();
    var taskView = new app.view.Task({
      model: taskModel
    });
    var startAt = moment('2000-01-10 09:00:00');
    spyOn(window, 'moment').andReturn(startAt);
    taskView.$el.find('.start').click();
    taskModel.stop(startAt.clone().add('second', 1));

    expect(taskModel.get('records')[0].date).toBe('2000-01-10');
    expect(taskModel.get('records')[0].time).toBe(1);
  });
});