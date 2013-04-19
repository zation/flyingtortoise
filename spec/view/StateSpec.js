describe('State View', function() {
  var stateView;
  var tasksCollection;

  beforeEach(function() {
    tasksCollection = new app.collection.Tasks({});
    stateView = new app.view.State({
      collection: tasksCollection
    });
  });

  it('should hide view when screen is vertical', function() {
    appendSetFixtures(stateView.$el);
    app.Event.trigger(app.Event.Rotate, 0);

    expect(stateView.$el).toBeHidden();
  });

  it('should render view when screen is horizontal', function() {
    spyOn(stateView, 'render');
    app.Event.trigger(app.Event.Rotate, 90);

    expect(stateView.render).toHaveBeenCalled();
  });

  it('should not hide or render when screen is not vertical or horizontal', function() {
    appendSetFixtures(stateView.$el);
    spyOn(stateView, 'render');
    stateView.$el.show();
    app.Event.trigger(app.Event.Rotate, 45);

    expect(stateView.$el).toBeVisible();
    expect(stateView.render).not.toHaveBeenCalled();
  });

  describe('should render', function() {
    beforeEach(function() {
      appendSetFixtures(stateView.$el);
      stateView.render();
    });

    it('to display element', function() {
      expect(stateView.$el).toBeVisible();
    });

    it('switchers view', function() {
      expect(stateView.$el).toContain('.switchers');
    });

    it('task name view', function() {
      expect(stateView.$el).toContain('.state-task-name');
    });

    it('chart view', function() {
      expect(stateView.$el).toContain('.chart');
    });
  });
});