describe('Time View', function() {
  var taskModel;
  var timeView;
  beforeEach(function() {
    taskModel = new app.collection.Tasks().create();
    timeView = new app.view.Time();
  });

  it('should show when start task', function() {
    appendSetFixtures(timeView.$el);
    expect(timeView.$el).toBeHidden();
    app.Event.trigger(app.Event.TaskStart, taskModel);
    expect(timeView.$el).toBeVisible();
  });

  it('should generate task order class name', function() {
    taskModel.set('order', 2);
    timeView.startTask(taskModel);

    expect(timeView.$el).toHaveClass('task-order-2');

    timeView.stopTask();

    expect(timeView.$el).not.toHaveClass('task-order-2');
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
    spyOn(app.Event, 'trigger');
    timeView.model = taskModel;
    timeView.stopTask();

    expect(timeView.model.stop).toHaveBeenCalledWith(expectedMoment);
    expect(timeView.$el).toBeHidden();
    expect(app.Event.trigger).toHaveBeenCalledWith(app.Event.TaskStop);
  });

  describe('should display time', function() {
    beforeEach(function() {
      jasmine.Clock.useMock();
      timeView.startTask(taskModel);
    });

    it('when seconds are less than 10', function() {
      jasmine.Clock.tick(7000);

      expect(timeView.$el.find('time')).toHaveText('00:07');
    });

    it('when seconds are more than 10', function() {
      jasmine.Clock.tick(17000);

      expect(timeView.$el.find('time')).toHaveText('00:17');
    });

    it('when minutes are less than 10', function() {
      jasmine.Clock.tick(70000);

      expect(timeView.$el.find('time')).toHaveText('01:10');
    });

    it('when minutes are more than 10', function() {
      jasmine.Clock.tick(700000);

      expect(timeView.$el.find('time')).toHaveText('11:40');
    });
  });

  it('should hide view when screen is vertical and view is visible', function() {
    appendSetFixtures(timeView.$el);
    timeView.$el.show();
    app.Event.trigger(app.Event.Rotate, 90);

    expect(timeView.$el).toBeHidden();
  });

  it('should display view when screen is horizontal and task already started', function() {
    appendSetFixtures(timeView.$el);
    timeView.startTask(taskModel);
    timeView.$el.hide();
    app.Event.trigger(app.Event.Rotate, 0);

    expect(timeView.$el).toBeVisible();
  });
});