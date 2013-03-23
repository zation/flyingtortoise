describe('Task View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var taskView = new app.view.Task({
      model: new app.model.Task({name: expectedName})
    });

    expect(taskView.$el).toHaveClass('task');
    expect(taskView.$el.find('.task-name')).toHaveText(expectedName);
  });

  it('should start task when click start button', function() {
    spyOn(app.Event, 'trigger');
    var expectedModel = new app.model.Task();
    var taskView = new app.view.Task({
      model: expectedModel
    });
    setFixtures(taskView.$el);
    taskView.startTask();

    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.TaskStart, expectedModel);
  });

  it('should generate the class of order', function() {
    var taskView = new app.view.Task({
      model: new app.model.Task({
        order: 2
      })
    });

    expect(taskView.$el).toHaveClass('task-order-2');
  });
});