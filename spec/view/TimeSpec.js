describe('Time View', function() {
  var taskModel;
  var timeView;
  beforeEach(function() {
    taskModel = new app.collection.Tasks().create();
    timeView = new app.view.Time();
  });

  it('should record time', function() {
    var momentStub = moment('2000-01-10 09:00:00');
    var stopAt = momentStub.clone().add('second', 1);
    spyOn(window, 'moment').andCallFake(function() {
      return momentStub;
    });
    app.Event.trigger(app.Event.TaskStart, taskModel);
    momentStub = stopAt;
    timeView.$el.find('.stop').click();

    expect(taskModel.get('records')[0].date).toBe('2000-01-10');
    expect(taskModel.get('records')[0].time).toBe(1);
  });

  it('should start to record time', function() {
    var expectedMoment = moment();
    spyOn(window, 'moment').andReturn(expectedMoment);
    spyOn(taskModel, 'start');
    var expectedName = 'some name';
    taskModel.set('name', expectedName);
    timeView.startTask(taskModel);

    expect(timeView.$el.find('.task-name')).toHaveText(expectedName);
    expect(timeView.model.start).toHaveBeenCalledWith(expectedMoment);
  });

  it('should stop to record time', function() {
    var expectedMoment = moment();
    spyOn(window, 'moment').andReturn(expectedMoment);
    spyOn(taskModel, 'stop');
    spyOn(taskModel, 'save');
    timeView.model = taskModel;
    timeView.stopTask();

    expect(timeView.model.stop).toHaveBeenCalledWith(expectedMoment);
    expect(timeView.$el).not.toExist();
  });
});