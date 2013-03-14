describe('TaskSummary View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var taskSummaryView = new app.view.TaskSummary({
      model: new app.model.Task({name: expectedName})
    });

    expect(taskSummaryView.$el).toHaveClass('task-summary');
    expect(taskSummaryView.$el).toHaveText(expectedName);
  });
});