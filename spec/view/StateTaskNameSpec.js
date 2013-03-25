describe('StateTaskName View', function() {
  it('should render the task name', function() {
    var expectedTaskName = 'name';
    var stateTaskNameView = new app.view.StateTaskName({
      model: new app.model.Task({
        name: expectedTaskName
      })
    });

    expect(stateTaskNameView.$el).toHaveText(expectedTaskName);
  });
});