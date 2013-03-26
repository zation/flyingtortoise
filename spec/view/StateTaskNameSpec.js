describe('StateTaskName View', function() {
  beforeEach(function() {

  });

  it('should render the task name', function() {
    var expectedTaskName = 'name';
    var stateTaskNameView = new app.view.StateTaskName({
      model: new app.model.Task({
        name: expectedTaskName
      })
    });

    expect(stateTaskNameView.$el).toHaveText(expectedTaskName);
  });

  it('should change task name when switch to other task', function() {
    var stateTaskNameView = new app.view.StateTaskName({
      model: new app.model.Task()
    });
    var expectedTaskName = 'other name';
    app.Event.trigger(app.Event.Switch, new app.model.Task({
      name: expectedTaskName
    }));

    expect(stateTaskNameView.$el).toHaveText(expectedTaskName);
  });

  it('should remove element when rotate to vertical', function() {
    var stateTaskNameView = new app.view.StateTaskName({
      model: new app.model.Task()
    });
    app.Event.trigger(app.Event.Rotate, 0);

    expect(stateTaskNameView.$el).not.toExist();
  });
});