describe('Task View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var expectedId = 1;
    var taskView = new app.view.Task({
      model: new app.model.Task({
        id: expectedId,
        name: expectedName
      })
    });

    expect(taskView.$el).toHaveClass('task');
    expect(taskView.$el.find('.task-name')).toHaveText(expectedName);
    expect(taskView.$el.find('.start')).toHaveAttr('href', '#/time/' + expectedId);
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