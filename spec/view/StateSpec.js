describe('State View', function() {
  var stateView;
  var tasksCollection;

  beforeEach(function() {
    tasksCollection = new app.collection.Tasks({});
    stateView = new app.view.State({
      collection: tasksCollection
    });
  });

  it('should hide view when screen is vertical and view is visible', function() {
    appendSetFixtures(stateView.$el);
    stateView.$el.show();
    app.Event.trigger(app.Event.Rotate, 0);

    expect(stateView.$el).toBeHidden();
  });

  it('should render view when screen is horizontal', function() {
    spyOn(stateView, 'render');
    app.Event.trigger(app.Event.Rotate, 90);

    expect(stateView.render).toHaveBeenCalled();
  });

  it('should display and append switchers when render', function() {
    appendSetFixtures(stateView.$el);
    stateView.render();

    expect(stateView.$el).toBeVisible();
    expect(stateView.$el).toContain('.switchers');
  });
});