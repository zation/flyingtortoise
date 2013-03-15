describe('TaskDetail View', function() {
  it('should render', function() {
    var expectedName = 'name';
    var taskDetailView = new app.view.TaskDetail({
      model: new app.model.Task({
        name: expectedName
      })
    });

    expect(taskDetailView.$el.find('.task-name')).toHaveText(expectedName);
  });

  it('should stop task when click stop button', function() {
    var taskModel = new app.collection.Tasks().create();
    var startAt = moment('2000-01-10 09:00:00');
    taskModel.start(startAt);
    var taskDetailView = new app.view.TaskDetail({
      model: taskModel
    });
    spyOn(window, 'moment').andReturn(startAt.clone().add('second', 1));
    taskDetailView.$el.find('.stop').click();

    expect(taskModel.get('records')[0].date).toBe('2000-01-10');
    expect(taskModel.get('records')[0].time).toBe(1);
  });
});