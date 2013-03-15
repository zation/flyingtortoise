describe('TaskSummary View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var taskSummaryView = new app.view.TaskSummary({
      model: new app.model.Task({name: expectedName})
    });

    expect(taskSummaryView.$el).toHaveClass('task-summary');
    expect(taskSummaryView.$el).toHaveText(expectedName);
  });

  it('should start task when click start button', function() {
    var taskModel = new app.model.Task();
    var taskSummaryView = new app.view.TaskSummary({
      model: taskModel
    });
    var startAt = moment('2000-01-10 09:00:00');
    spyOn(window, 'moment').andReturn(startAt);
    taskSummaryView.$el.find('.start').click();
    taskModel.stop(startAt.clone().add('second', 1));

    expect(taskModel.get('records')[0].date).toBe('2000-01-10');
    expect(taskModel.get('records')[0].time).toBe(1);
  });
});